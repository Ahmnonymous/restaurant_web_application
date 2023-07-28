#include <iostream>
#include <cstdlib>
#include <unordered_map>
#include <mysql.h>
#include <string>
#include <cstdio>
#include <vector>

// Define a data structure to store items and their toppings
struct ItemWithToppings {
    std::string itemName;
    std::string itemDescription;
    std::string itemPrice;
    std::string itemPic;
    std::unordered_map<std::string, std::string> toppings;
};

// Constants
const int MAX_BUFFER_SIZE = 1024;

// Function to read POST data
std::string readPostData() {
    char* envContentLength = getenv("CONTENT_LENGTH");
    if (envContentLength != nullptr) {
        int contentLength = std::atoi(envContentLength);
        if (contentLength > 0) {
            char buffer[MAX_BUFFER_SIZE];
            int bytesRead = 0;
            int totalBytesRead = 0;
            while (totalBytesRead < contentLength) {
                bytesRead = fread(buffer + totalBytesRead, 1, contentLength - totalBytesRead, stdin);
                if (bytesRead <= 0) {
                    break;
                }
                totalBytesRead += bytesRead;
            }
            buffer[totalBytesRead] = '\0';
            std::string postData(buffer);
            return postData;
        }
    }
    return "";
}

// Function to read GET data
std::string readGetData() {
    char* envQueryString = getenv("QUERY_STRING");
    if (envQueryString != nullptr) {
        return std::string(envQueryString);
    }
    return "";
}

// Function to execute the database query and retrieve all items with toppings
bool getAllItemsWithToppings(MYSQL* connection, std::unordered_map<int, ItemWithToppings>& itemsMap) {
    std::string itemWithToppingSql = "SELECT i.id, i.name AS item_name, i.description, i.price AS item_price, i.picture, "
                                     "t.name AS topping_name, t.price AS topping_price "
                                     "FROM Item AS i "
                                     "LEFT JOIN Topping AS t ON i.id = t.item_id";

    if (mysql_query(connection, itemWithToppingSql.c_str()) != 0) {
        std::cerr << "Error executing the item with topping query: " << mysql_error(connection) << std::endl;
        return false;
    }

    MYSQL_RES* itemWithToppingResult = mysql_store_result(connection);
    if (itemWithToppingResult == nullptr) {
        std::cerr << "Error retrieving item with topping result: " << mysql_error(connection) << std::endl;
        return false;
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(itemWithToppingResult))) {
        std::string itemId = row[0] ? row[0] : "";
        std::string itemName = row[1] ? row[1] : "";
        std::string itemDescription = row[2] ? row[2] : "";
        std::string itemPrice = row[3] ? row[3] : "";
        std::string itemPic = row[4] ? row[4] : "";
        std::string toppingName = row[5] ? row[5] : "";
        std::string toppingPrice = row[6] ? row[6] : "";

        int itemIdInt = std::stoi(itemId);

        // Check if the item already exists in the map
        if (itemsMap.find(itemIdInt) == itemsMap.end()) {
            // If the item does not exist, create a new entry in the map
            ItemWithToppings newItem;
            newItem.itemName = itemName;
            newItem.itemDescription = itemDescription;
            newItem.itemPrice = itemPrice;
            newItem.itemPic = itemPic;

            // Add the topping to the toppings map for the current item
            if (!toppingName.empty()) {
                newItem.toppings[toppingName] = toppingPrice;
            }

            // Insert the item into the map
            itemsMap[itemIdInt] = newItem;
        } else {
            // If the item already exists, add the topping to the toppings map for the current item
            if (!toppingName.empty()) {
                itemsMap[itemIdInt].toppings[toppingName] = toppingPrice;
            }
        }
    }

    // Free the result
    mysql_free_result(itemWithToppingResult);

    return true;
}

void generateHTMLResponse(const std::unordered_map<int, ItemWithToppings>& itemsMap) {
    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";

    // Build the item cards using the data from the itemsMap
    for (const auto& item : itemsMap) {
        int itemId = item.first;
        const ItemWithToppings& currentItem = item.second;

        // Build the overlay for the current item
        std::cout << "  <div id=\"overlay-" << itemId << "\" class=\"overlay-container\">\n";
        std::cout << "    <div class=\"overlay-content\">\n";
        std::cout << "      <div class=\"overlay-close\" onclick=\"closeOverlay(event,"<<itemId<<")\">X</div>\n";
        std::cout << "      <img src=\"./images/" << currentItem.itemPic << "\" alt=\"\" class=\"card-image\">\n";
        std::cout << "      <h4>" << currentItem.itemName << "</h4>\n";
        std::cout << "      <p>" << currentItem.itemDescription << "</p>\n";
        std::cout << "      <hr>\n";
        std::cout << "      <span class=\"price\">" << currentItem.itemPrice << "</span>\n";
        std::cout << "      <div class=\"quantity-controls\">\n";
        std::cout << "        <button class=\"quantity-btn\" onclick=\"decrementQuantity("<<itemId<<","<<currentItem.itemPrice<<")\">-</button>\n";
        std::cout << "        <span class=\"quantity\">1</span>\n";
        std::cout << "        <button class=\"quantity-btn\" onclick=\"incrementQuantity("<<itemId<<","<<currentItem.itemPrice<<")\">+</button>\n";
        std::cout << "      </div>\n";
        std::cout << "      <h5>Add-ons</h5>\n";
        std::cout << "      <div class=\"checkbox-options\">\n";

        for (const auto& topping : currentItem.toppings) {
            // Append the topping information to the overlay
            std::cout << "        <label>\n";
            std::cout << "  <input type=\"checkbox\" name=\"" << topping.first << "\" onchange=\"updateQuantityAndPrice(" << itemId << "," << currentItem.itemPrice << ")\">\n";
            std::cout << "          <span class=\"option-text\">" << topping.first << "</span>\n";
            std::cout << "          <span class=\"option-price\">" << topping.second << "</span>\n";
            std::cout << "        </label>\n";
        }

        std::cout << "        <a href=\"#\" class=\"btn add-to-cart-btn\" onclick=\"addToCart(event," << itemId << ")\">Add to Cart</a>\n";
        std::cout << "      </div>\n";
        std::cout << "    </div>\n";
        std::cout << "  </div>\n";

    }

    std::cout << "</body>\n</html>\n";
}

int main() {
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    std::string method = getenv("REQUEST_METHOD");
    std::string data;

    if (method == "POST") {
        data = readPostData();
    } else if (method == "GET") {
        data = readGetData();
    } else {
        // Unsupported method
        std::cout << "Status: 405 Method Not Allowed\n\n";
        std::cout << "Method not allowed.";
        return 0;
    }

    std::unordered_map<int, ItemWithToppings> itemsMap;
    if (getAllItemsWithToppings(connection, itemsMap)) {
        generateHTMLResponse(itemsMap);
    }

    // Close the connection
    mysql_close(connection);

    return 0;
}

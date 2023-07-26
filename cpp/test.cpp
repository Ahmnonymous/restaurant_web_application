#include <iostream>
#include <cstdlib>
#include <unordered_map>
#include <mysql.h>
#include <string>
#include <cstdio>

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

// Function to execute the database query and retrieve item with toppings
bool getItemWithToppings(MYSQL* connection, const std::string& itemId, std::unordered_map<int, ItemWithToppings>& itemsMap) {
    std::string itemWithToppingSql = "SELECT i.name AS item_name, i.description, i.price AS item_price, i.picture, "
                                     "t.name AS topping_name, t.price AS topping_price "
                                     "FROM Item AS i "
                                     "LEFT JOIN Topping AS t ON i.id = t.item_id "
                                     "WHERE i.id = " + itemId;

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
        std::string itemName = row[0] ? row[0] : "";
        std::string itemDescription = row[1] ? row[1] : "";
        std::string itemPrice = row[2] ? row[2] : "";
        std::string itemPic = row[3] ? row[3] : "";
        std::string toppingName = row[4] ? row[4] : "";
        std::string toppingPrice = row[5] ? row[5] : "";

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

// Function to generate the HTML response
void generateHTMLResponse(const std::unordered_map<int, ItemWithToppings>& itemsMap, const std::string& itemId) {
    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";

    // Build the item cards using the data from the itemsMap
    std::string itemCards;
    for (const auto& item : itemsMap) {
        std::string itemIdStr = std::to_string(item.first);
        const ItemWithToppings& currentItem = item.second;

        // Build the item card for the current item
        std::string itemCard;
        std::cout << "  <div id=\"overlay\" class=\"overlay-container\">\n";
        std::cout << "  <div class=\"overlay-content\">\n";
        std::cout << "    <div class=\"overlay-close\" onclick=\"closeOverlay(event)\">X</div>\n";
        std::cout << "    <img src=\"./images/" << currentItem.itemPic << "\" alt=\"\" class=\"card-image\">\n";
        std::cout << "    <h4>" << currentItem.itemName << "</h4>\n"; // Using the item name as the category
        std::cout << "    <p>" << currentItem.itemDescription << "</p>\n"; // Replace with the actual item description
        std::cout << "    <hr>\n";
        std::cout << "    <span class=\"price\">" << currentItem.itemPrice << "</span>\n"; // Display the item price
        std::cout << "    <div class=\"quantity-controls\">\n";
        std::cout << "      <button class=\"quantity-btn\" onclick=\"decrementQuantity()\">-</button>\n";
        std::cout << "      <span class=\"quantity\">1</span>\n";
        std::cout << "      <button class=\"quantity-btn\" onclick=\"incrementQuantity()\">+</button>\n";
        std::cout << "    </div>\n";
        std::cout << "    <h5>Add on or Changes:</h5>\n";
        std::cout << "    <div class=\"checkbox-options\">\n";

        for (const auto& topping : currentItem.toppings) {
            // Append the topping information to the item card
            std::cout << "      <label>\n";
            std::cout << "        <input type=\"checkbox\" name=\"" << topping.first << "\" onchange=\"updateQuantityAndPrice()\">\n";
            std::cout << "        <span class=\"option-text\">" << topping.first << "</span>\n";
            std::cout << "        <span class=\"option-price\">" << topping.second << "</span>\n";
            std::cout << "      </label>\n";
        }

        itemCard += "    <a href=\"#\" class=\"btn add-to-cart-btn\" onclick=\"addToCart(event)\">Add to Cart</a>\n";
        itemCard += "  </div>\n";
        itemCard += "</div>\n";

        // Add the item card to the item menu
        itemCards += itemCard;
    }

    // Insert the dynamically generated item menu
    std::cout << itemCards;
    std::cout << "<p>Received itemId: " << itemId << "</p>\n";
    std::cout << "</body>\n</html>\n";
}

int main() {
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    std::string method = getenv("REQUEST_METHOD");
    std::string itemId;
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

    std::size_t found = data.find("itemId=");
    if (found != std::string::npos) {
        itemId = data.substr(found + 7); // Length of "itemId=" is 7
    }

    std::unordered_map<int, ItemWithToppings> itemsMap;
    if (!itemId.empty() && getItemWithToppings(connection, itemId, itemsMap)) {
        generateHTMLResponse(itemsMap, itemId);
    }

    // Close the connection
    mysql_close(connection);

    return 0;
}

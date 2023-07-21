#include <iostream>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <cstdlib>

int main() {
    // Connect to the database
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    // Prepare the SQL statement to retrieve item data
    std::string itemSql = "SELECT id, name, description, price, picture FROM Item";

    // Execute the query to retrieve item data
    if (mysql_query(connection, itemSql.c_str()) != 0) {
        std::cerr << "Error executing item query: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    // Retrieve the result for item data
    MYSQL_RES* itemResult = mysql_store_result(connection);
    if (itemResult == nullptr) {
        std::cerr << "Error retrieving item result: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    // Process the result and build the HTML overlay content
    std::string overlayContent;
    MYSQL_ROW itemRow;
    while ((itemRow = mysql_fetch_row(itemResult))) {
        std::string itemId = itemRow[0];
        std::string name = itemRow[1];
        std::string description = itemRow[2];
        std::string price = itemRow[3];
        std::string picture = itemRow[4];

        // Build the HTML content for each item dynamically
        overlayContent += "<!-- Burger overlay -->\n";
        overlayContent += "<div id=\"overlay\" class=\"overlay-container\">\n";
        overlayContent += "  <div class=\"overlay-content\">\n";
        overlayContent += "    <div class=\"overlay-close\" onclick=\"closeOverlay(event)\">X</div>\n";
        overlayContent += "    <img src=\"" + picture + "\" alt=\"\" class=\"card-image\">\n";
        overlayContent += "    <h4>" + name + "</h4>\n";
        overlayContent += "    <p>" + description + "</p>\n";
        overlayContent += "    <hr>\n";
        overlayContent += "    <span class=\"price\">" + price + "</span>\n";
        overlayContent += "    <!-- Quantity buttons -->\n";
        overlayContent += "    <div class=\"quantity-controls\">\n";
        overlayContent += "      <button class=\"quantity-btn\" onclick=\"decrementQuantity()\">-</button>\n";
        overlayContent += "      <span class=\"quantity\">1</span>\n";
        overlayContent += "      <button class=\"quantity-btn\" onclick=\"incrementQuantity()\">+</button>\n";
        overlayContent += "    </div>\n";
        overlayContent += "    <!-- Add on or Changes heading -->\n";
        overlayContent += "    <h5>Add on or Changes:</h5>\n";

        // Prepare the SQL statement to retrieve add-on or changes options for the current item
        std::string addOnChangeSql = "SELECT name, price FROM Topping WHERE item_id = " + itemId;

        // Execute the query to retrieve add-on or changes options for the current item
        if (mysql_query(connection, addOnChangeSql.c_str()) != 0) {
            std::cerr << "Error executing add-on or changes query: " << mysql_error(connection) << std::endl;
            mysql_close(connection);
            return 1;
        }

        // Retrieve the result for add-on or changes options
        MYSQL_RES* addOnChangeResult = mysql_store_result(connection);
        if (addOnChangeResult == nullptr) {
            std::cerr << "Error retrieving add-on or changes result: " << mysql_error(connection) << std::endl;
            mysql_close(connection);
            return 1;
        }

        // Process the result and build the checkbox options
        MYSQL_ROW addOnChangeRow;
        while ((addOnChangeRow = mysql_fetch_row(addOnChangeResult))) {
            std::string addOnChangeName = addOnChangeRow[0];
            std::string addOnChangePrice = addOnChangeRow[1];

            overlayContent += "    <div class=\"checkbox-options\">\n";
            overlayContent += "      <label>\n";
            overlayContent += "        <input type=\"checkbox\" name=\"" + addOnChangeName + "\"> " + addOnChangeName + "\n";
            overlayContent += "      </label>\n";
            overlayContent += "    </div>\n";
        }

        // Free the result for add-on or changes options
        mysql_free_result(addOnChangeResult);

        overlayContent += "    <a href=\"#\" class=\"btn add-to-cart-btn\" onclick=\"addToCart(event)\">Add to Cart</a>\n";
        overlayContent += "  </div>\n";
        overlayContent += "</div>\n";
    }

    // Free the result for item data
    mysql_free_result(itemResult);

    // Close the connection
    mysql_close(connection);

    // Generate the HTML response
    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";

    // Insert the dynamically generated overlay content
    std::cout << overlayContent;

    std::cout << "</body>\n</html>\n";

    return 0;
}

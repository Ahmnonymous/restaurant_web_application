#include <iostream>
#include <iomanip>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <vector>
#include <sstream>

struct CartItem {
    std::string item_name;
    std::string description;
    std::string picture;
    int quantity;
    int item_id;
    int cust_id;
    int top_id;
    double tot_price;
    double item_price;
};

MYSQL* connectToDatabase(const std::string& host, const std::string& user, const std::string& password, const std::string& database) {
    MYSQL* connection = mysql_init(nullptr);
    if (!connection) {
        std::cerr << "Error initializing MySQL: " << mysql_error(connection) << std::endl;
        return nullptr;
    }

    if (!mysql_real_connect(connection, host.c_str(), user.c_str(), password.c_str(), database.c_str(), 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return nullptr;
    }

    return connection;
}

void closeDatabaseConnection(MYSQL* connection) {
    if (connection) {
        mysql_close(connection);
    }
}

std::vector<CartItem> getCartItemsFromDatabase(MYSQL* connection) {
    std::vector<CartItem> cartItems;

    std::string sql = "SELECT i.picture, i.name AS item_name, "
                      "CASE WHEN it.id IS NULL THEN i.description "
                      "ELSE CONCAT('With ', GROUP_CONCAT(t.name SEPARATOR ', ')) END AS description, "
                      "i.price AS item_price, c.quantity, c.item_id, c.customer_id, c.item_topping_id "
                      "FROM Cart c JOIN Customer cu ON c.customer_id = cu.id "
                      "JOIN Item i ON c.item_id = i.id LEFT JOIN Item_Topping it ON c.item_topping_id = it.id "
                      "LEFT JOIN Topping t ON it.topping_id = t.id "
                      "GROUP BY i.picture, i.name, i.description, i.price, c.quantity, c.customer_id, c.item_id, c.item_topping_id";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return cartItems;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (!result) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return cartItems;
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        CartItem item;
        item.picture = row[0] ? row[0] : ""; // Handle null value
        item.item_name = row[1] ? row[1] : ""; // Handle null value
        item.description = row[2] ? row[2] : ""; // Handle null value
        item.item_price = std::stod(row[3]);
        item.quantity = std::stoi(row[4]);
        //item.item_id = std::stoi(row[5]);
        //item.cust_id = std::stoi(row[6]);
        //item.top_id = std::stoi(row[7]);
        item.tot_price = item.quantity * item.item_price;
        cartItems.push_back(item);
    }

    mysql_free_result(result);
    return cartItems;
}


void printCartItemHTML(const CartItem& item) {
    std::cout << "<div class=\"Cart\">\n";
    std::cout << "<img src=\"images/" << item.picture << "\" alt=\"Item image\" class=\"Cart-image\">\n";
    std::cout << "<h4>" << item.item_name << "</h4>\n";
    std::cout << "<p class=\"Cart-des\">" << item.description << "</p>\n";
    std::cout << "<p class=\"cart-price price\">" << item.item_price << "</p>\n";
    std::cout << "<div class=\"quantity-controls Cart-quantity\">\n";
    std::cout << "<button class=\"quantity-btn Cart-qbtn\" onclick=\"decrementQuantity()\">-</button>\n";
    std::cout << "<span class=\"quantity Cart-q\">" << item.quantity << "</span>\n";
    std::cout << "<button class=\"quantity-btn Cart-qbtn\" onclick=\"incrementQuantity()\">+</button>\n";
    std::cout << "</div>\n";
    std::cout << "<button class=\"delete-cart btn btn-danger\">Remove</button>\n";
    std::cout << "</div>\n";
}

int main() {
    MYSQL* connection = connectToDatabase("localhost", "root", "786$toqA", "rwa_db");
    if (!connection) {
        return 1;
    }

    std::vector<CartItem> cartItems = getCartItemsFromDatabase(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n";

    for (const auto& item : cartItems) {
        printCartItemHTML(item);
    }
    
    std::cout << "</body>\n</html>\n";

    closeDatabaseConnection(connection);

    return 0;
}

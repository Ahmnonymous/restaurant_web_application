#include <iostream>
#include <iomanip>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <vector>
#include <sstream>

// Define a structure to hold cart item information
struct CartItem {
    std::string item_name;
    std::string description;
    std::string picture;
    int quantity;
    int item_id;
    double tot_price;
    double item_price;
    std::vector<std::string> toppings; // Use a vector to store multiple toppings
    double toppings_price;
};

// Function to connect to the database
MYSQL* connectToDatabase(const std::string& host, const std::string& user, const std::string& password, const std::string& database) {
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, host.c_str(), user.c_str(), password.c_str(), database.c_str(), 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return nullptr;
    }
    return connection;
}

std::vector<CartItem> getCartItemsFromDatabase(MYSQL* connection) {
    std::vector<CartItem> cartItems;

    std::string sql = "SELECT picture, item_name, description, item_price, quantity, item_id, "
                      "topping_name, topping_price FROM cartd";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return cartItems;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return cartItems;
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        CartItem item;
        item.picture = row[0];
        item.item_name = row[1];
        item.description = row[2];
        item.item_price = std::stod(row[3]);
        item.quantity = std::stoi(row[4]);
        item.item_id = std::stoi(row[5]);
        item.tot_price = item.quantity * item.item_price;
        
        // Populate toppings information for the current item
        do {
            std::string topping_name = row[6];
            double topping_price = std::stod(row[7]);
            if (!topping_name.empty()) {
                item.toppings.push_back(topping_name);
                item.toppings_price += topping_price;
            }
        } while ((row = mysql_fetch_row(result)) && item.item_id == std::stoi(row[5]));

        cartItems.push_back(item);
    }

    mysql_free_result(result);
    return cartItems;
}

// Function to generate HTML for a single cart item
std::string generateCartItemHTML(const CartItem& item) {
    std::ostringstream stream;
    stream << "<tr>\n";
    stream << "<td># " << item.item_id << "</td>\n";
    stream << "<td>\n<div class=\"order-owner\">\n";
    stream << "<img src=\"./images/" << item.picture << "\" alt=\"Item image\">\n";
    stream << "<span>" << item.item_name << "</span>\n";
    stream << "</div>\n</td>\n";
    stream << "<td>" << item.description << "</td>\n";
    stream << "<td>" << std::fixed << std::setprecision(2) << item.item_price << "</td>\n"; // Apply precision here
    stream << "<td>\n<div class=\"payment-status payment-pending\">\n";
    stream << "<span>" << item.quantity << "</span>\n";
    stream << "</div>\n</td>\n";
    stream << "<td>" << std::fixed << std::setprecision(2) << item.tot_price << "</td>\n"; // Apply precision here

    // Display toppings information
    stream << "<td>\n";
    for (const auto& topping : item.toppings) {
        stream << topping << "<br>\n";
    }
    stream << "</td>\n";

    stream << "<td class=\"remove-item\">\n";
    stream << "<button class=\"delete-button\">Delete</button>\n";
    stream << "</td>\n";
    stream << "</tr>\n";
    return stream.str();
}

int main() {
    MYSQL* connection = connectToDatabase("localhost", "root", "786$toqA", "rwa_db");
    if (!connection) {
        return 1;
    }

    std::vector<CartItem> cartItems = getCartItemsFromDatabase(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";
    std::cout << "<div class=\"row m-4\">\n";
    std::cout << "<div class=\"col-3 col-md-6 col-sm-12\"></div>\n";
    std::cout << "<div class=\"col-12\">\n";
    std::cout << "<div class=\"box\">\n";
    std::cout << "<div class=\"box-header\">\n";
    std::cout << "Recent orders\n";
    std::cout << "</div>\n";
    std::cout << "<div class=\"box-body overflow-scroll\">\n";
    std::cout << "<table>\n";
    std::cout << "<thead>\n";
    std::cout << "<tr>\n";
    std::cout << "<th>SNo.</th>\n";
    std::cout << "<th class=\"item\">Item</th>\n";
    std::cout << "<th>Description</th>\n";
    std::cout << "<th>Price</th>\n";
    std::cout << "<th>Quantity</th>\n";
    std::cout << "<th>Total</th>\n";
    std::cout << "<th>Toppings</th>\n"; // Added toppings column header
    std::cout << "<th>Remove from cart</th>\n";
    std::cout << "</tr>\n";
    std::cout << "</thead>\n";
    std::cout << "<tbody>\n";

    for (const auto& item : cartItems) {
        std::cout << generateCartItemHTML(item);
    }

    std::cout << "</tbody>\n";
    std::cout << "</table>\n";
    std::cout << "<div class=\"checkout\">\n";
    std::cout << "<a href=\"payment.html\"><button>Check Out</button></a>\n";
    std::cout << "</div>\n";
    std::cout << "</div>\n";
    std::cout << "</div>\n";
    std::cout << "</div>\n";
    std::cout << "</body>\n</html>\n";

    mysql_close(connection);

    return 0;
}

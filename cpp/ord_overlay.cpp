#include <iostream>
#include <iomanip>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <vector>
#include <sstream>

// Define a structure to hold order information
struct Order {
    int order_id;
    std::string order_status;
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

std::vector<Order> getOrdersFromDatabase(MYSQL* connection) {
    std::vector<Order> orders;

    std::string sql = "SELECT id, status FROM `Order`";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return orders;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return orders;
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        Order order;
        order.order_id = std::stoi(row[0]);
        order.order_status = row[1];
        orders.push_back(order);
    }

    mysql_free_result(result);
    return orders;
}

int main() {
    MYSQL* connection = connectToDatabase("localhost", "root", "786$toqA", "rwa_db");
    if (!connection) {
        return 1;
    }

    std::vector<Order> orders = getOrdersFromDatabase(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";

    std::vector<std::string> orderOptions;
    std::string orderOptionsQuery = "SELECT status FROM OrderOptions";
    if (mysql_query(connection, orderOptionsQuery.c_str()) == 0) {
        MYSQL_RES* result = mysql_store_result(connection);
        if (result != nullptr) {
            MYSQL_ROW row;
            while ((row = mysql_fetch_row(result))) {
                orderOptions.push_back(row[0]);
            }
            mysql_free_result(result);
        }
    }

    // Generate the update overlay HTML with dynamic select options
    for (const auto& order : orders) {
        std::cout << "<div class=\"orderoverlay\" id=\"orderoverlay" << order.order_id << "\">\n";
        std::cout << "  <div class=\"order-overlay-content\">\n";
        std::cout << "    <h2>Update Status</h2>\n";
        std::cout << "    <div class=\"overlaycontainer\">\n";
        std::cout << "      <select id=\"status" << order.order_id << "\">\n";

        for (const auto& option : orderOptions) {
            std::cout << "        <option value=\"" << option << "\">" << option << "</option>\n";
        }

        std::cout << "      </select>\n";
        std::cout << "      <button id=\"updateStatus" << order.order_id << "\" onclick=\"status(event, " << order.order_id << ")\">Update</button>\n";
        std::cout << "    </div>\n";
        std::cout << "  </div>\n";
        std::cout << "</div>\n";
    }
    

    std::cout << "</body>\n</html>\n";

    mysql_close(connection);

    return 0;
}



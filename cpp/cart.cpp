#include <iostream>
#include <cstdlib>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <nlohmann/json.hpp>
using json = nlohmann::json;

int main() {
    // Read the JSON data from the standard input (cin)
    std::string jsonStr;
    std::getline(std::cin, jsonStr);
    json jsonData = json::parse(jsonStr);

    // Access the individual fields
    int itemId = jsonData["itemId"];
    int quantity = jsonData["quantity"];
    const auto& checkedValues = jsonData["checkedValues"];

    // Treat checkedValues as an empty array if it's null
    json modifiedCheckedValues = checkedValues.is_null() ? json::array() : checkedValues;

    // Establish a connection to the database
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "786$toqA", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    // Prepare and execute the SQL INSERT statement
    std::string sql = "INSERT INTO Cart (customer_id, item_id, item_topping_id, quantity) VALUES (501, ?, ?, ?)";
    MYSQL_STMT* stmt = mysql_stmt_init(connection);
    if (stmt == nullptr) {
        std::cerr << "Failed to initialize MySQL statement" << std::endl;
        mysql_close(connection);
        return 1;
    }

    if (mysql_stmt_prepare(stmt, sql.c_str(), sql.length()) != 0) {
        std::cerr << "Failed to prepare MySQL statement: " << mysql_error(connection) << std::endl;
        mysql_stmt_close(stmt);
        mysql_close(connection);
        return 1;
    }

    MYSQL_BIND bindParams[3];
    memset(bindParams, 0, sizeof(bindParams));

    bindParams[0].buffer_type = MYSQL_TYPE_LONG;
    bindParams[0].buffer = &itemId;
    bindParams[2].buffer_type = MYSQL_TYPE_LONG;
    bindParams[2].buffer = &quantity;

    // If there are no toppings, execute the INSERT without topping_id
    if (modifiedCheckedValues.empty()) {
        bindParams[1].buffer_type = MYSQL_TYPE_NULL;
        bindParams[1].buffer = nullptr;

        if (mysql_stmt_bind_param(stmt, bindParams) != 0) {
            std::cerr << "Failed to bind MySQL parameters: " << mysql_error(connection) << std::endl;
            mysql_stmt_close(stmt);
            mysql_close(connection);
            return 1;
        }

        if (mysql_stmt_execute(stmt) != 0) {
            std::cerr << "Failed to execute MySQL statement: " << mysql_error(connection) << std::endl;
            mysql_stmt_close(stmt);
            mysql_close(connection);
            return 1;
        }
    } else {
        // If there are toppings, execute the INSERT for each topping
        for (const auto& topping : modifiedCheckedValues) {
            int topping_id = topping.is_number() ? topping.get<int>() : 0;

            bindParams[1].buffer_type = topping.is_number() ? MYSQL_TYPE_LONG : MYSQL_TYPE_NULL;
            bindParams[1].buffer = topping.is_number() ? &topping_id : nullptr;

            if (mysql_stmt_bind_param(stmt, bindParams) != 0) {
                std::cerr << "Failed to bind MySQL parameters: " << mysql_error(connection) << std::endl;
                mysql_stmt_close(stmt);
                mysql_close(connection);
                return 1;
            }

            if (mysql_stmt_execute(stmt) != 0) {
                std::cerr << "Failed to execute MySQL statement: " << mysql_error(connection) << std::endl;
                mysql_stmt_close(stmt);
                mysql_close(connection);
                return 1;
            }
        }
    }

    mysql_stmt_close(stmt);
    mysql_close(connection);

    // Create a JSON response
    json response;
    response["status"] = "success";
    response["message"] = "Data received and inserted successfully";
    response["itemId"] = itemId;
    response["quantity"] = quantity;
    response["checkedValues"] = modifiedCheckedValues;

    // Send the JSON response back to the client
    std::cout << "Content-Type: application/json\r\n\r\n";
    std::cout << response.dump();

    return 0;
}

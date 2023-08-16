#include <iostream>
#include <cstdlib>
#include <mysql.h>
#include <nlohmann/json.hpp>
using json = nlohmann::json;

int main() {
    // Read the JSON data from the standard input (cin)
    std::string jsonStr;
    std::getline(std::cin, jsonStr);
    json jsonData = json::parse(jsonStr);

    // Access the individual fields
    std::string name = jsonData["name"];
    std::string phone = jsonData["phone"];
    std::string password = jsonData["password"];

    // Establish a connection to the database
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "786$toqA", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    // Prepare and execute the SQL INSERT statement
    std::string sql = "INSERT INTO Customer (name, password, phone) VALUES (?, ?, ?)";
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

    bindParams[0].buffer_type = MYSQL_TYPE_STRING;
    bindParams[0].buffer = &name[0];
    bindParams[0].buffer_length = name.length();

    bindParams[1].buffer_type = MYSQL_TYPE_STRING;
    bindParams[1].buffer = &password[0];
    bindParams[1].buffer_length = password.length();

    bindParams[2].buffer_type = MYSQL_TYPE_STRING;
    bindParams[2].buffer = &phone[0];
    bindParams[2].buffer_length = phone.length();

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

    mysql_stmt_close(stmt);
    mysql_close(connection);

    // Create a JSON response
    json response;
    response["status"] = "success";
    response["message"] = "Customer data inserted successfully";

    // Send the JSON response back to the client
    std::cout << "Content-Type: application/json\r\n\r\n";
    std::cout << response.dump();

    return 0;
}

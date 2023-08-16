#include <iostream>
#include <cstdlib>
#include <mysql.h>
#include <string>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Function to connect to the database
MYSQL* connectToDatabase(const std::string& host, const std::string& user, const std::string& password, const std::string& database) {
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, host.c_str(), user.c_str(), password.c_str(), database.c_str(), 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return nullptr;
    }
    return connection;
}

int main() {
    // Get JSON input from standard input
    std::string jsonStr;
    std::getline(std::cin, jsonStr);

    // Parse the JSON input
    json jsonData = json::parse(jsonStr);

    // Extract values from parsed JSON
    int order_id = jsonData["order_id"];             
    std::string status = jsonData["status"]; 

    // Connect to the database
    MYSQL* connection = connectToDatabase("localhost", "root", "786$toqA", "rwa_db");
    if (!connection) {
        std::cerr << "Error connecting to the database" << std::endl;
        return 1;
    }

    // Construct and execute the update query
    std::string updateQuery = "UPDATE `Order` SET status = '" + status + "' WHERE id = " + std::to_string(order_id);

    if (mysql_query(connection, updateQuery.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    // Close the database connection
    mysql_close(connection);

    // Return a JSON response
    json responseJson;
    responseJson["message"] = "Successfully Updated!";
    responseJson["order_id"] = order_id;
    responseJson["status"] = status;

    std::cout << "Content-Type: application/json\n\n";
    std::cout << responseJson.dump(4); // Pretty-print with indentation
    
    return 0;
}

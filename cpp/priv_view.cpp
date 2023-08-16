#include <iostream>
#include <cstdlib>
#include <mysql.h>
#include <string>
#include <vector>
#include <map>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Define a structure to hold user information
struct User {
    int id;
    std::string username;
    std::vector<std::string> privileges;
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

std::vector<std::string> getPrivilegesFromDatabase(MYSQL* connection) {
    std::vector<std::string> privileges;

    std::string sql = "SELECT privilege FROM Privilege";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return privileges;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return privileges;
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        privileges.push_back(row[0]);
    }

    mysql_free_result(result);
    return privileges;
}

std::vector<User> getUsersWithPrivileges(MYSQL* connection) {
    std::vector<User> users;

    std::string sql = "SELECT id, name FROM employee";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return users;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return users;
    }

    std::map<int, User> userMap;
    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        int id = std::stoi(row[0]);
        std::string username = row[1];

        if (userMap.find(id) == userMap.end()) {
            User user;
            user.id = id;
            user.username = username;
            userMap[id] = user;
        }
    }

    for (const auto& pair : userMap) {
        users.push_back(pair.second);
    }

    mysql_free_result(result);
    return users;
}

int main() {
    MYSQL* connection = connectToDatabase("localhost", "root", "786$toqA", "rwa_db");
    if (!connection) {
        return 1;
    }

    std::vector<User> users = getUsersWithPrivileges(connection);
    std::vector<std::string> privileges = getPrivilegesFromDatabase(connection);

    mysql_close(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";
    std::cout << "<div class=\"form-container mt-4\">\n";
    std::cout << "  <div class=\"section\">\n";
    std::cout << "    <div class=\"input-group\">\n";
    std::cout << "      <label for=\"employee\">USER</label>\n";
    std::cout << "      <select id=\"employee\">\n";

    for (const auto& user : users) {
        std::cout << "        <option value=\"" << user.id << "\">" << user.username << "</option>\n";
    }
    
    std::cout << "      </select>\n";
    std::cout << "    </div>\n";
    
    std::cout << "    <div class=\"input-group\">\n";
    std::cout << "      <label for=\"role\">PRIVILEGES</label>\n";
    std::cout << "      <select id=\"role\">\n";

    for (const std::string& privilege : privileges) {
        std::cout << "        <option value=\"" << privilege << "\">" << privilege << "</option>\n";
    }

    std::cout << "      </select>\n";
    std::cout << "    </div>\n";
    
    std::cout << "    <button id=\"assignRole\" onclick=\"privileg(event)\">Update</button>\n";
    std::cout << "  </div>\n";
    std::cout << "</div>\n";
    std::cout << "</body>\n</html>\n";

    return 0;
}

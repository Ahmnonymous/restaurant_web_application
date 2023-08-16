#include <iostream>
#include <mysql.h>
#include <string>
#include <vector>
#include <map>

// Define a structure to hold user information
struct User {
    std::string username;
    std::string privilege;
};

int main() {
    MYSQL* connection = mysql_init(nullptr);
    if (!connection) {
        std::cerr << "Error initializing database connection." << std::endl;
        return 1;
    }

    const std::string host = "localhost";
    const std::string user = "root";
    const std::string password = "786$toqA";
    const std::string database = "rwa_db";

    if (!mysql_real_connect(connection, host.c_str(), user.c_str(), password.c_str(), database.c_str(), 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    std::string sql = "SELECT name, privilege FROM employee";
    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (!result) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    std::vector<User> users;
    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        User user;
        user.username = row[0];
        user.privilege = row[1];
        users.push_back(user);
    }

    mysql_free_result(result);
    mysql_close(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";
    std::cout << "<table class=\"ordertable\">\n";
    std::cout << "  <thead>\n";
    std::cout << "    <tr>\n";
    std::cout << "      <th>USER</th>\n";
    std::cout << "      <th>PRIVILEGE</th>\n";
    std::cout << "    </tr>\n";
    std::cout << "  </thead>\n";
    std::cout << "  <tbody>\n";

    for (const auto& user : users) {
        std::cout << "    <tr>\n";
        std::cout << "      <td>" << user.username << "</td>\n";
        std::cout << "      <td>\n";
        std::cout << "        <span class=\"privilege\">" << user.privilege << "</span>\n";
        std::cout << "      </td>\n";
        std::cout << "    </tr>\n";
    }

    std::cout << "  </tbody>\n";
    std::cout << "</table>\n";
    std::cout << "</body>\n</html>\n";

    return 0;
}

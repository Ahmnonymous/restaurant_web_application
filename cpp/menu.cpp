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

    // Prepare the SQL statement to retrieve category names
    std::string sql = "SELECT DISTINCT category FROM Menu";

    // Execute the query
    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    // Retrieve the result
    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        mysql_close(connection);
        return 1;
    }

    // Process the result and build the category buttons
    std::string categoryButtons;
    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        std::string category = row[0];
        //categoryButtons += "<button class=\"menu-btn\" data-category=\"" + category + "\" id=\"" + category + "\">" + category + "</button>\n";
        categoryButtons += "<button class=\"menu-btn\" data-category=\"" + category + "\" onclick=\"scrollToCategory('" + category + "', this)\">" + category + "</button>\n";

    }

    // Free the result
    mysql_free_result(result);

    // Close the connection
    mysql_close(connection);

    // Generate the HTML response
    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";
    //std::cout << "<div class=\"menu-container d-flex flex-nowrap\">\n";
    //std::cout << "<button class=\"menu-btn active\" data-category=\"all\">All</button>\n";
    std::cout << categoryButtons; // Insert the dynamically generated category buttons
    //std::cout << "</div>\n";
    std::cout << "</body>\n</html>\n";

    return 0;
}
#include <iostream>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <cstdlib>

int main() {
    // Retrieve the ID parameter from the request
    std::string id;
    char* data = getenv("QUERY_STRING");
    if (data != nullptr) {
        std::string query_string(data);
        size_t pos = query_string.find("id=");
        if (pos != std::string::npos) {
            id = query_string.substr(pos + 3);
        }
    }

    // Connect to the database
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }
    // Prepare the SQL statement
    std::string sql = "SELECT * FROM customer WHERE id = '" + id + "'";

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

    // Process the result
    MYSQL_ROW row;
    std::string output;
    if ((row = mysql_fetch_row(result))) {
        // Assuming the table has four columns: "id", "password", "phone", "is_auth"
        std::string id = row[0];
        std::string password = row[1];
        std::string phone = row[2];
        std::string is_auth = row[3];

        // Build the output HTML
        output += "<h2>Retrieved Data</h2>\n";
        output += "<p><strong>ID:</strong> " + id + "</p>\n";
        output += "<p><strong>Password:</strong> " + password + "</p>\n";
        output += "<p><strong>Phone:</strong> " + phone + "</p>\n";
        output += "<p><strong>Authenticate:</strong> " + is_auth + "</p>\n";
    } else {
        // No matching record found
        output = "<p>No record found for the provided ID.</p>\n";
    }

    // Free the result and close the connection
    mysql_free_result(result);
    mysql_close(connection);

    // Generate the HTML response
    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "<title>Retrieve Result</title>\n";
    std::cout << "</head>\n<body>\n";
    std::cout << output;
    std::cout << "</body>\n</html>\n";

    return 0;
}
#include <iostream>
#include <fstream>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <vector>

int main() {
    // Retrieve CGI environment variables
    const char* requestMethod = getenv("REQUEST_METHOD");

    // Check if the form is submitted (assuming POST method)
    if (requestMethod && strcmp(requestMethod, "POST") == 0) {
        // Database connection parameters
        const char* servername = "localhost";
        const char* username = "root";
        const char* password = "";
        const char* dbname = "rwa_db";

        // Create a new connection
        MYSQL* conn;
        conn = mysql_init(nullptr);

        // Check if the connection was successful
        if (!mysql_real_connect(conn, servername, username, password, dbname, 0, nullptr, 0)) {
            std::cerr << "Connection failed: " << mysql_error(conn) << std::endl;
            return 1;
        }

        // Get the uploaded file details
        const char* fileName = getenv("FILE_NAME");
        const char* fileTmpName = getenv("FILE_TMP_NAME");

        // Read the file content
        std::ifstream file(fileTmpName, std::ios::binary);
        std::vector<char> fileData((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
        file.close();

        // Prepare the SQL statement
        MYSQL_STMT* stmt = mysql_stmt_init(conn);
        const char* query = "UPDATE Item SET picture = ? WHERE id = 1";
        mysql_stmt_prepare(stmt, query, strlen(query));

        MYSQL_BIND bindParams[1];
        memset(bindParams, 0, sizeof(bindParams));

        bindParams[0].buffer_type = MYSQL_TYPE_LONG_BLOB;
        bindParams[0].buffer = &fileData[0];
        bindParams[0].buffer_length = fileData.size();

        mysql_stmt_bind_param(stmt, bindParams);

        // Execute the statement
        if (mysql_stmt_execute(stmt) == 0) {
            std::cout << "Content-type:text/html\r\n\r\n";
            std::cout << "<html><body>";
            std::cout << "Image uploaded successfully.";
            std::cout << "</body></html>";
        } else {
            std::cout << "Content-type:text/html\r\n\r\n";
            std::cout << "<html><body>";
            std::cout << "Error uploading image: " << mysql_stmt_error(stmt);
            std::cout << "</body></html>";
        }

        // Close the statement and connection
        mysql_stmt_close(stmt);
        mysql_close(conn);
    }

    return 0;
}

#include <iostream>
#include <string>

int main() {
    // Retrieve form data from standard input
    std::string data;
    std::getline(std::cin, data);

    // Parse form dataa
    std::string username;
    std::string password;

    // Extract username and password from form data
    // (Note: This is a basic example. In a real application, you should handle data validation and sanitization)
    size_t usernameStart = data.find("username=");
    if (usernameStart != std::string::npos) {
        size_t usernameEnd = data.find("&", usernameStart);
        username = data.substr(usernameStart + 9, usernameEnd - usernameStart - 9);
    }

    size_t passwordStart = data.find("password=");
    if (passwordStart != std::string::npos) {
        size_t passwordEnd = data.find("&", passwordStart);
        password = data.substr(passwordStart + 9, passwordEnd - passwordStart - 9);
    }

    // Perform authentication or further processing with the retrieved data
    // For this example, we will simply output the received username and password

    std::cout << "Content-type:text/html\r\n\r\n";
    std::cout << "<html>\n";
    std::cout << "<head>\n";
    std::cout << "<title>Sign In - Processing</title>\n";
    std::cout << "</head>\n";
    std::cout << "<body>\n";
    std::cout << "<h2>Sign In - Processing</h2>\n";
    std::cout << "<p>Username: " << username << "</p>\n";
    std::cout << "<p>Password: " << password << "</p>\n";
    std::cout << "</body>\n";
    std::cout << "</html>\n";

    return 0;
}

#include <iostream>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>
#include <string>
#include <cstdlib>

// Function to execute the MySQL query and build the item menu
std::string buildItemMenu(MYSQL* connection) {
    std::string itemMenu;
    std::string itemCards;
    std::string currentCategory;

    std::string sql = "SELECT I.*, M.category FROM Item AS I "
                      "INNER JOIN Menu AS M ON I.menu_id = M.id "
                      "WHERE I.available = 'Y' ORDER BY M.category;";

    if (mysql_query(connection, sql.c_str()) != 0) {
        std::cerr << "Error executing query: " << mysql_error(connection) << std::endl;
        return "";
    }

    MYSQL_RES* result = mysql_store_result(connection);
    if (result == nullptr) {
        std::cerr << "Error retrieving result: " << mysql_error(connection) << std::endl;
        return "";
    }

    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result))) {
        std::string itemID = row[0];
        std::string categoryID = row[1];
        std::string itemName = row[2];
        std::string itemDescription = row[3];
        std::string itemPrice = row[4];
        std::string itemPic = row[5];
        std::string itemAvailable = row[6];
        std::string category = row[7];

        if (category != currentCategory) {
            if (!itemCards.empty()) {
                itemMenu += "<div class=\"row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-6\">\n";
                itemMenu += itemCards;
                itemMenu += "</div>\n";
                itemCards.clear();
            }

            itemMenu += "<h2 id=\"" + category + "\" class=\"mx-5\" style=\"";
            itemMenu += "font-weight: 600;";
            itemMenu += "margin-top: 50px;";
            itemMenu += "margin-bottom: 30px;";
            itemMenu += "transition: all 0.3s ease;";
            itemMenu += "\">" + category + "</h2>\n";
            itemMenu += "<hr class=\"Line\">\n";
            currentCategory = category;
        }

        itemCards += "<div class=\"food-item " + category + "\">\n";
        itemCards += "  <div class=\"dashboard-card\" data-id=\"" + itemID + "\" data-category-id=\"" + categoryID + "\">\n";
        itemCards += "    <img src=\"./images/"+itemPic+"\" alt=\"\" class=\"card-image\">\n";
        itemCards += "    <div class=\"card-detail\">\n";
        itemCards += "      <h4>" + itemName + "</h4>\n";
        itemCards += "      <a href=\"#\" class=\"see-detail\" data-id=\"" + itemID + "\" data-category-id=\"" + categoryID + "\" onclick=\"showOverlay(event,"+itemID+")\">Order Me</a>\n";
        itemCards += "    </div>\n";
        itemCards += "  </div>\n";
        itemCards += "</div>\n";
    }

    // Add the last set of item cards
    if (!itemCards.empty()) {
        itemMenu += "<div class=\"row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-6\">\n";
        itemMenu += itemCards;
        itemMenu += "</div>\n";
    }

    mysql_free_result(result);
    return itemMenu;
}


int main() {
    MYSQL* connection = mysql_init(nullptr);
    if (!mysql_real_connect(connection, "localhost", "root", "786$toqA", "rwa_db", 0, nullptr, 0)) {
        std::cerr << "Error connecting to database: " << mysql_error(connection) << std::endl;
        return 1;
    }

    std::string itemMenu = buildItemMenu(connection);

    mysql_close(connection);

    std::cout << "Content-Type: text/html\n\n";
    std::cout << "<!DOCTYPE html>\n";
    std::cout << "<html>\n<head>\n";
    std::cout << "</head>\n<body>\n";
    std::cout << itemMenu;
    std::cout << "</body>\n</html>\n";

    return 0;
}

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

    // Prepare the SQL statement to retrieve items
    std::string sql = "SELECT Item.*, Menu.category FROM Item INNER JOIN Menu ON Item.menu_id = Menu.id ORDER BY Menu.category";

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

    // Process the result and build the item menu and item cards
    std::string itemMenu;
    std::string itemCards;
    MYSQL_ROW row;
    std::string currentCategory;
    while ((row = mysql_fetch_row(result))) {
        std::string itemID = row[0];
        std::string categoryID = row[1];
        std::string itemName = row[2];
        std::string itemDescription = row[3];
        std::string itemPrice = row[4];
        std::string itemPic = row[5];
        std::string category = row[6];
        

        if (category != currentCategory) {
            // Add the previous item cards to the item menu
            if (!itemCards.empty()) {
                itemMenu += "<div class=\"row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-6\">\n";
                itemMenu += itemCards;
                itemMenu += "</div>\n";
                itemCards.clear();
            }

            // Add a category header to the item menu
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
        itemCards += "      <hr>\n";
        itemCards += "      <a href=\"#\" class=\"see-detail\" data-id=\"" + itemID + "\" data-category-id=\"" + categoryID + "\" onclick=\"showOverlay(event)\">Add To Cart</a>\n";
        itemCards += "    </div>\n";
        itemCards += "  </div>\n";
        itemCards += "</div>\n";
    }

    // Add the last item cards to the item menu
    if (!itemCards.empty()) {
        itemMenu += "<div class=\"dashboard-content\">\n";
        itemMenu += "<div class=\"row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-6\">\n";
        itemMenu += itemCards;
        itemMenu += "</div>\n";
        itemMenu += "</div>";
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
    //std::cout << "<div class=\"item-content\">\n";
    std::cout << itemMenu; // Insert the dynamically generated item menu
    //std::cout << "</div>\n";
    std::cout << "</body>\n</html>\n";

    return 0;
}

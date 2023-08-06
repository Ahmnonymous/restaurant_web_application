#include <iostream>
#include <cstdlib>
#include <unordered_map>
#include <mysql.h>
#include <string>
#include <cstdio>
#include <vector>
#include <iostream>
#include <nlohmann/json.hpp>
using json = nlohmann::json;

int main() {
    // Read the JSON data from the standard input (cin)
    std::string jsonStr;
    std::getline(std::cin, jsonStr);
    json jsonData = json::parse(jsonStr);

    // Access the individual fields
    int itemId = jsonData["itemId"];
    int quantity = jsonData["quantity"];
    const auto& checkedValues = jsonData["checkedValues"];

    // Process the data (you can add your own logic here)

    // Create a JSON response
    json response;
    response["status"] = "success";
    response["message"] = "Data received successfully";
    response["processedItemId"] = itemId;

    // Send the JSON response back to the client
    std::cout << "Content-Type: application/json\r\n\r\n";
    std::cout << response.dump();

    return 0;
}

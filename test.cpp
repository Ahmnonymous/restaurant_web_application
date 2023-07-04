#include <iostream>
#include <winsock2.h>
#include <windows.h>
#include <mysql.h>
#include <mysql_com.h>

int main()
{
    MYSQL* conn;

    conn = mysql_init(0);
    conn = mysql_real_connect(conn, "localhost", "root", "", "db_rwa", 0, NULL, 0);

    if (conn)
    {
        std::cout << "Connection to the database successful." << std::endl;
    }
    else
    {
        std::cout << "Connection failure." << std::endl;
    }

    mysql_close(conn);

    return 0;
}

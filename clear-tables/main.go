package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
)

func main() {

	deleteRecords("mysql", "root:rootpassword@tcp(localhost:3320)/paymentsdb", "UserPayments")

	deleteRecords("postgres", "postgres://postgres:postgres@localhost:5432/users?sslmode=disable", "users")

	deleteRecords("mysql", "root:rootpassword@tcp(localhost:3310)/usersdb", "UserCount")
}

func deleteRecords(driver, connectionString, table string) {
	db, err := sql.Open(driver, connectionString)
	if err != nil {
		log.Fatalf("Could not connect to %s database: %v", driver, err)
	}
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("DELETE FROM %s", table))
	if err != nil {
		log.Fatalf("Could not delete records from table %s: %v", table, err)
	}

	fmt.Printf("All records deleted from table %s\n", table)
}

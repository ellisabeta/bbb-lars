package main

import (
	"bbb-lars/services"
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/tables", services.GetAllTables)
	http.HandleFunc("/table", services.CreateTable)

	fmt.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

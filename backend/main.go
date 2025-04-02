package main

import (
	"bbb-lars/backend/handlers"
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/table", handlers.CreateTable)

	fmt.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}

package main

import (
	"bbb-lars/backend/handlers"
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/table", handlers.CreateTable)

	fmt.Println("Server running on port 27017")
	log.Fatal(http.ListenAndServe(":27017", nil))
}

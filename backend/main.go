package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	fmt.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}

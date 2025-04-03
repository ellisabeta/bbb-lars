package main

import (
    "bbb-lars/services"
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/tables", services.GetAllTables).Methods("GET")
    r.HandleFunc("/table", services.CreateTable).Methods("POST")

    r.HandleFunc("/table-groups", services.GetAllTableGroups).Methods("GET")
    r.HandleFunc("/table-group", services.CreateTableGroup).Methods("POST")

    r.HandleFunc("/rooms", services.GetAllRooms).Methods("GET")
    r.HandleFunc("/room", services.CreateRoom).Methods("POST")

    fmt.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}

package services

import (
    "bbb-lars/config"
    "bbb-lars/entities"
    "context"
    "encoding/json"
    "go.mongodb.org/mongo-driver/bson"
    "net/http"
)

func CreateRoom(w http.ResponseWriter, r *http.Request) {
    client, err := config.ConnectToMongoDB()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer client.Disconnect(context.Background())

    var room entities.Room
    if err := json.NewDecoder(r.Body).Decode(&room); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    collection := client.Database("bbb-lars").Collection("rooms")
    result, err := collection.InsertOne(context.Background(), room)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(result)
}

func GetAllRooms(w http.ResponseWriter, r *http.Request) {
    client, err := config.ConnectToMongoDB()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer client.Disconnect(context.Background())

    collection := client.Database("bbb-lars").Collection("rooms")
    cursor, err := collection.Find(context.Background(), bson.D{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(context.Background())

    var rooms []entities.Room
    for cursor.Next(context.Background()) {
        var room entities.Room
        if err := cursor.Decode(&room); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        rooms = append(rooms, room)
    }

    json.NewEncoder(w).Encode(rooms)
}

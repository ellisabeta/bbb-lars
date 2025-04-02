package handlers

import (
	"bbb-lars/backend/config"
	"bbb-lars/backend/models"
	"context"
	"encoding/json"
	"net/http"
)

func CreateTable(w http.ResponseWriter, r *http.Request) {
	client, err := config.ConnectToMongoDB()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer client.Disconnect(context.Background())

	var table models.Table
	if err := json.NewDecoder(r.Body).Decode(&table); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	collection := client.Database("mongodb").Collection("tables")
	result, err := collection.InsertOne(context.Background(), table)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type Table struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	isAvailable bool               `bson:"isAvailable,omitempty"`
}

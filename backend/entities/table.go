package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type Table struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	IsAvailable bool               `bson:"isAvailable,omitempty" json:"isAvailable,omitempty"`
}

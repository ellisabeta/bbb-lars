package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type TableGroup struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name   string             `bson:"name,omitempty" json:"name,omitempty"`
	Tables []Table            `bson:"tables,omitempty" json:"tables,omitempty"`
}

package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type TableGroup struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Tables []string           `bson:"tables,omitempty"`
}

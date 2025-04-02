package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Table struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Active bool               `bson:"active,omitempty" json:"active,omitempty"`
}

package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type Room struct {
    ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
    Name        string             `bson:"name,omitempty" json:"name,omitempty"`
    TableGroups []TableGroup       `bson:"tableGroups,omitempty" json:"tableGroups,omitempty"`
}
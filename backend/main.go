package main

import (
	"bbb-lars/services"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
)

var (
	server       *gin.Engine
	tableservice services.tableService
	ctx          context.Context
	mongoclient  *mongo.Client
	err          error
)

func init() {
	ctx = context.TODO()

	mongoconn := options.Client().ApplyURI("mongodb://localhost:27017")
	mongoclient, err = mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Fatal(err)
	}
	err = mongoclient.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("mongo connection established")

	usercollection = mongoclient.Database("userdb").Collection("users")
	// userservice = services.NewUserService(usercollection, ctx)
	// usercontroller = controllers.New(userservice)
	server = gin.Default()
}

// v1/user/create
func main() {
	defer mongoclient.Disconnect(ctx)
	basepath := server.Group("/v1")
	usercontroller.RegisterUserRoutes(basepath)
	log.Fatal(server.Run(":9090"))
}

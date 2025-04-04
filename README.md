## Berufsfachschule BBB Learning Availability Registration System

### Choice of programming language
For the frontend we use **React with TypeScript**.  
For the backend we use **goLang**.  
Our database language is **MongoDB**.  
![My Skills](https://skillicons.dev/icons?i=react,typescript,go,mongodb&theme=light)

### Build
``npm start`` change to the frontend folder and run the command for the **frontend** on localhost:3000 r  
``go run main.go`` change to the backend folder and run the backend on localhost:8080

### Docker DB
```shell
  docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

### Project Structure
│ bbl-lars  
│    ├── backend  
│    │   ├── config  
│    │   ├── database  
│    │   ├── handlers  
│    │   ├── models  
│    │   ├── routes  
│    ├── frontend  
│    ├── .gitignore  
│    ├── go.mod  
│    ├── README.md

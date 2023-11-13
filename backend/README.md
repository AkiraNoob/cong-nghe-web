## This is for backend

- To use mongodb, we need to install docker. After installing docker successfully, we will create mongodb with command :
```bash
export MONGODB_VERSION=6.0-ubi8
docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongodb/mongodb-community-server:$MONGODB_VERSION
```
- Create file env for backend based on .env.example file to have the port for api route, mongodb config.
For example: 
PORT=8080
MONGODB_CONNECT_STRING="mongodb://localhost:27017"
MONGODB_PASSWORD="pass"

- Run server backend with command line: 
```bash
npm install 
npm run dev
```




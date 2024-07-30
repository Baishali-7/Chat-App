const express = require("express")
const http = require('http')
const path = require('path')
const {Server} = require("socket.io")

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3500;
const io = new Server(server)

io.on('connection',(socket) =>{
    socket.on('user-message',(message) =>{
        socket.broadcast.emit('message',message)
        console.log("A new User Message",message)
    }
    )
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username + "joined the conversation")
    })
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username + "left the conversation")
    })


    console.log("A new user has connected",socket.id)
})

app.use(express.static(path.resolve("./public")))
app.get('/',(res,req) =>{
    return res.sendFile( "/public/index.html")
})

server.listen(port,() => console.log(`Server is listening at ${port}`))
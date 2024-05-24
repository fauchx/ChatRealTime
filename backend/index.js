const express = require('express')
const app = express()
const http = require("http")
const cors = require('cors')
const {Server} = require('socket.io')
const { Socket } = require('dgram')
app.use(cors())


const server = http.createServer(app)
const io = new Server(server,{
    cors :{
        origin:'http://localhost:5173',
        methods: ['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`Usuario actual: ${socket.id}`)
    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`Usuario con id: ${socket.id} se unio a la sala ${data}`)
    })
    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", ()=>{
        console.log('Desconectado ', socket.id)
    })
})


server.listen(3001, ()=>{
    console.log('server listening')
})
const express = require("express")
const cors= require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const uri = process.env.URI
const userRoute = require("./Routes/userRoutes")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const port = process.env.PORT || 5000

app.use("/user", userRoute)
app.use("/chat", chatRoute)
app.use("/message", messageRoute)

app.get("/", (req,res)=>{
  res.send("Welcome to jesseChat BackendServer")
})

app.listen(port, ()=>{
  console.log("Server started at port " + port)
})

mongoose.connect(uri).then(()=>{
  console.log("Mongoose connected ")
}).catch(err => console.log(err))

const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config()
const uploadFile = require("express-fileupload")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ka9ky.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const app = express()
app.use(cors())
app.use(uploadFile())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


client.connect(err => {
    const collection = client.db("crud").collection("crudcollection");
    console.log("db connected")
});
  

app.get('/', (req, res) => {
  res.send('crud operation!')
})

const port = 4000
app.listen( process.env.PORT || port , console.log("running port 4000") )
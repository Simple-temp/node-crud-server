const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const uploadFile = require("express-fileupload")
const { MongoClient, ServerApiVersion } = require('mongodb');
const  ObjectID = require('mongodb').ObjectId;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ka9ky.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const app = express()
app.use(cors())
app.use(uploadFile())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


client.connect(err => {

  const collection = client.db("crud").collection("crudcollection");

  app.post("/posttodo", (req, res) => {

    const file = req.files.file
    const name = req.body.name
    const title = req.body.title
    const msg = req.body.msg
    const newImg = file.data
    const newFile = newImg.toString("base64")
    var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(newFile, "base64")
    }
    console.log({ image, name, title, msg })

    collection.insertOne({name, title,image,msg})
      .then(function (result) {
        res.send(result.insertedCount > 0)
      })

  })

  app.get("/gettodo",(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  app.delete("/deleteitem/:id",(req,res)=>{
    const id = req.params.id
    console.log(id)
    collection.deleteOne({_id:ObjectID(req.params.id)})
    .then(function(result){
      res.send(result.deletedCount > 0)
    })
  })

  console.log("db connected")
});


app.get('/', (req, res) => {
  res.send('crud operation!')
})

const port = 4000
app.listen(process.env.PORT || port, console.log("running port 4000"))
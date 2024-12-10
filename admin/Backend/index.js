const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const routes = require("./routes/routes")
const cors =require('cors')
const path = require('path');

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

port = process.env.PORT

app.use("/api", routes )


app.listen(port, function(err){
    if(err){
        console.log("there is an error in starting the server")
    }
    console.log("Server is running at port "+ port)
})
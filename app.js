const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./model/user")
const cookieParser = require("cookie-parser");
const url =
  "mongodb+srv://root:root@cluster0.jzewljl.mongodb.net/api?retryWrites=true&w=majority";
  
const app = express();
const routes = require("./routes/user.routes")
  
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes)

mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true }, 
    
    app.listen(8000, ()=>{console.log("Server started on port 8000.")})
    
    );

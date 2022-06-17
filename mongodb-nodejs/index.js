const express = require("express");

const { mongoose } = require("./app/config/dbconfig");

const bodyParser = require("body-parser");

const cors = require("cors");

const threedmRoutes = require("./app/routes/threedmRoute");

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/models', threedmRoutes);

app.get('/', (req, res) => {
    res.sendFile(path + "imdex.html")
    // res.json({message : "Welcome to the 3D Model Application"});
})

app.listen(4000, ()=>{
    console.log("The Server is listening on port 4000");
})
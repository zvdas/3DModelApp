const express = require("express");

const { mongoose } = require("./app/config/dbconfig");

var threedmRoutes = require("./app/routes/threedmRoute");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/models', threedmRoutes);

app.get('/', (req, res) => {
    res.json({message : "Welcome to the 3D Model Application"});
})

app.listen(4000, ()=>{
    console.log("The Server is listening on port 4000");
})
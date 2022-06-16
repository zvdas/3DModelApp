const mongoose = require("mongoose");

let url = 'mongodb://localhost:27017/threedm_db';

mongoose.connect(url, (err) => {
    if(!err){
        console.log("Connection to MongoDB Successful");
    }else{
        console.log(`Connection to MongoDB Failed with error : ${JSON.stringify(err, undefined, 2)}`);
    }
})

module.exports = mongoose;
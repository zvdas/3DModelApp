const { threedm } = require("../models/threedmModel");

// Create a new model (upload as string)
exports.sendOne = (req, res) => {
    var threed =  new threedm({modelstring: req.file.buffer.toString('base64'), filename: req.body.filename});
    threed.save((err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log(`Error sending 3D model list : ${JSON.stringify(err, undefined, 2)}`);
        }
    })
}

//Retrieve all the models from the database
exports.getAll = (req, res) => {
    threedm.find((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log(`Error retrieving 3D model list : ${JSON.stringify(err, undefined, 2)}`);
        }
    });
}
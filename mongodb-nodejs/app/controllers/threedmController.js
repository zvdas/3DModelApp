const { threedm } = require("../models/threedmModel");

// Create a new model (upload as string)
exports.sendOne = (req, res) => {
    if(!req.body.modelstring){
        var modelString = req.file.buffer.toString('base64');
    }else{
        var modelString = req.body.modelstring;
    }
    var threed =  new threedm({modelstring: modelString, filename: req.body.filename});
    threed.save((err, doc) => {
        if(!err){
            res.send(doc);
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
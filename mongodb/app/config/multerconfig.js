const multer = require("multer");

/*
exports.storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'threedmodels/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

exports.upload = multer({ storage: this.storage });
*/

exports.upload = multer({ });
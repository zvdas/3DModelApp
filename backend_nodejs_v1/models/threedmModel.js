const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    modelstring: String,
    filename: String
}, {
    timestamps : true
});

schema.method("toJSON", function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

var threedm = mongoose.model("model", schema);

module.exports = { threedm };
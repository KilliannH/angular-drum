var mongoose = require('mongoose');

//Books Schema
var drummersSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    bands:{
      type: String,
    },
    description:{
        type: String
    },
    brands:{
        type: String
    },
    publisher:{
        type: String
    },
    image_url:{
        type: String
    },

    create_date:{
        type: Date,
        default: Date.now
    }
});

var Drummer = module.exports = mongoose.model('Drummer', drummersSchema);

// Get drummers
module.exports.getDrummers = function (callback, limit) {
    Drummer.find(callback).limit(limit);   
    //We can debug what mongoose do under the hood by console.log this line

    //I don't know why but the collection name that mongoose finded was "drummers" instead of "drummer".
    //Issue solved
}

module.exports.getDrummerById = function (id, callback) {
    Drummer.findById(id, callback)
}

module.exports.addDrummer = function (drummer, callback) {
    Drummer.create(drummer, callback);
}

module.exports.updateDrummer = function (id, drummer, options, callback) {
    var query = {_id: id};
    var update = {
        name: drummer.name,
        description: drummer.description,
        brands: drummer.brands,
        bands: drummer.bands,
        image_url: drummer.image_url
    }
    Drummer.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteDrummer = function (id, callback) {
    var query = {_id: id};
    Drummer.remove(query, callback);

}
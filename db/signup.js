var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var signup = new Schema({
   
    email: {type:String,require:true},
    password: {type:String, require:true}
});

module.exports = signup; 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({
   
    orderNumber: {type:String,require:true},
    orderDueDate: {type:String, require:true},
    customerBuyerName: {type:String, require:true},
    customerAddress: {type:String, require:true},
    customerPhone: {type:String, require:true},
    orderTotal: {type:String, require:true}

});

module.exports = order; 
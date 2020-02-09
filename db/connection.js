var mongoose = require("mongoose");
var signup = require("./signup");
var order = require("./order");

// mongoose.connect("mongodb://localhost:27017/vidjot" , { useNewUrlParser: true }); 
mongoose.connect('mongodb://tusharbansal:tushar.12@ds033419.mlab.com:33419/assignment_v1', { useNewUrlParser: true,  useUnifiedTopology: true  },);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});
 
var signup = mongoose.model("signup", signup); 
var order = mongoose.model("order", order); 


module.exports = {
   signup : signup,
   order : order
}

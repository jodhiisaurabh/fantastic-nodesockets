// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/messagingd');

// create a schema
var messageSchema = new Schema({
  msg: String,
  handler:String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', messageSchema);

// make this available to our users in our Node applications
console.log("Schema")
module.exports = User;

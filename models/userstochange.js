var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var CodeSchema = new Schema({

  name :String,
  email: String
});

module.exports = mongoose.model('Userstochange', CodeSchema);

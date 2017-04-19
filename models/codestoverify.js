var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var CodeSchema = new Schema({

  language: String,
  name :String,
  code :String,
  count:{ type:Number, default:0},
  creator :String,
  creatoremail :String

});

module.exports = mongoose.model('CodeVerify', CodeSchema);

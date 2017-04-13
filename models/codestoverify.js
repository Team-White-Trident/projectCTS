var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var CodeSchema = new Schema({
//  cat: { type: Schema.Types.ObjectId, ref: 'Category' },
  //category: String,
  language: String,
  name :String,
  code :String,
  count:{ type:Number, default:0},
  creator :String,
  creatoremail :String,
  reviewed: { type:Boolean, default : false}
});

module.exports = mongoose.model('CodeVerify', CodeSchema);

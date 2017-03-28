var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var TemplateSchema = new Schema({
//  cat: { type: Schema.Types.ObjectId, ref: 'Category' },
  //category: String,
  language: String,
  name :String,
  code :String,
  count:{ type:Number, default:0}
});

module.exports = mongoose.model('Template', TemplateSchema);

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var TemplateSchema = new Schema({
//  cat: { type: Schema.Types.ObjectId, ref: 'Category' },
  //category: String,
  language: String,
  name :String,
  code :String
});

module.exports = mongoose.model('Template', TemplateSchema);

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var LanguageSchema = new Schema( {
  name: { type: String, unique:true, lowercase:true }
});

module.exports = mongoose.model('Language',LanguageSchema);

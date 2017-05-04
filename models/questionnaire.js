var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var QuestionSchema = new Schema({
name: String,
option1: String,
option2: String,
option3: String,
option4: String,
answer: String
});

module.exports = mongoose.model('Question', QuestionSchema);

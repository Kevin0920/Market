var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
  content: { type: String, required:true },
  _answers: [{ type: Schema.Types.ObjectId, ref:"Answer" }],
  description: { type: String, require:true },
  _user: { type: Schema.Types.ObjectId, ref:"User" }
}, {timestamps: true});

var Question = mongoose.model('Question', QuestionSchema);


var UserSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, require: true},
  _questions: [{type: Schema.Types.ObjectId, ref:"Question"}],
  _answers: [{type: Schema.Types.ObjectId, ref:"Answer"}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);


var AnswerSchema = new mongoose.Schema({
  _questions: [{type: Schema.Types.ObjectId, ref:"Question"}],
  _user: {type: Schema.Types.ObjectId, ref: "User"},
  content: {type: String, required: true},
  detail: {type: String},
  likes: Number
}, {timestamps: true});

var Answer = mongoose.model("Answer", AnswerSchema);

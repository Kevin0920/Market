var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new mongoose.Schema({
  questions: { type: String, required:true },
  answers: { type: String, required:true },
  description: { type: String, require:true },
  _user: [{ type: Schema.Types.ObjectId, ref:"User" }]
}, {timestamps: true});

var Survey = mongoose.model('Survey', SurveySchema);


var UserSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, require: true},
  _survey: [{type: Schema.Types.ObjectId, ref:"Survey"}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);

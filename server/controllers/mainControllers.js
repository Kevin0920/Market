var mongoose = require('mongoose');
var path = require("path");
var Question = mongoose.model("Question");
var User = mongoose.model("User");
var Answer = mongoose.model("Answer");

module.exports = {

  register: function(req, res) {
    console.log("from controller register: ", req.body);
    User.findOne({email: req.body.email}, function(err, user) {
      console.log("from controller reg user: ", user);
      if (err) {
        console.log("register error from controller ", err);
      }
      else {
        if (user === null) {
          var user = new User({userName: req.body.userName, email: req.body.email, password: req.body.password});
          user.save(function(err, user) {
            if (err) {
              console.log("from controller reg: ", err);
            }
            else {
              res.json({success:"success", user:user});
            }
          })
        }
      }
    })
  },

  allQuestion: function(req, res) {
    console.log("controller all question");
    Question.find({}).populate("_user").sort('createdAt').exec(function(err, questions) {
      if (err) {
        console.log("fail get questions", err);
        res.json({err:err});
      }
      res.json(questions);
    })
  },

  oneQuestion: function(req, res) {
    Question.findOne({_id: req.params.id}).populate({path: "_answers", populate: {path: "_user"}}).exec(function(err, question) {
      // console.log("from controller getOneQuestion: ", question);
      if(err) {
        console.log("from controller getOneQuestion err: ", err);
      }
      else {
        // console.log("from controller getOneQuestion question: ", question);
        res.json(question);
        console.log(question);
      }
    })
  },

  // like function 

  like: function(req, res) {
    console.log("controller like");
    Answer.findOne({_id: req.params.id}, function(err, answer) {
      if(err) {
        console.log("can't like this answer");
      }
      else {
        console.log("incrementing like this", answer);
        answer.likes += 1;
        answer.save(function(err) {
          if(err) {
            console.log("err from like in controller");
          } 
          else {
            console.log("like++ now");
          }
        })
      }
    })
  },

  search: function(req, res) {
    Question.find({content: {$regex: req.body.search}}).sort({updatedAt: "desc"}).exec(function(err, question) {
      if(err) {
        console.log("from controller search error: ", err);
      }
      else {
        res.json(question);
      }
    })
  },

  login: function(req, res) {
    console.log(req.body);
    console.log("from controller login: ", req.body.email);
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
      if (err) {
        console.log("can't find this user email from controller", err);
      }
      else {
        console.log("successfully login", user);
        res.json(user);
      }
    })
  },

  // create new answer by current login user 
  createAns: function(req, res) {
    var quesId = req.params.question_id;
    var userId = req.params.user_id;
    var answer = new Answer(req.body);
    answer.likes = 0;
    // add answers with question
    Question.findOne({_id: quesId}, function(err, ques){
      console.log("controller create answer", ques);
      answer._questions = ques._id;
      answer.save(function(err) {
        if(err) {
          console.log("can't save this answer with the question");
        }
        else {
          ques._answers.push(answer);
          ques.save(function(err) {
            if(err) {
              console.log("controller createAns after finding the question then save the answer to it");
            }
            else {
              console.log("answer created success");
            }
          })
        }
      })
    })
    // save this anwers into this specific user 
    User.findOne({_id: userId}, function(err, user){
      console.log("controller save answer to this login user", user);
      answer._user = user._id;
      answer.save(function(err) {
        if(err) {
          console.log("answer can't save to the user");
        }
        else {
          user.save(function(err) {
            user._answers.push(answer);
            user.save(function(err) {
              if(err) {
                console.log("final err in createAns");
              }
              else {
                console.log("answer save to the user");
              }
            })
          })
        }
      })
    })
  },



  // create new question by user
  create: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      console.log("controller create route", req.params.id, user);
      var question = new Question(req.body);
      question._user = user._id;
      user._questions.push(question);
      question.save(function(err) {
        if (err) {
          console.log(err);
          res.json('unsuccessfully');
        }
        else {
          user.save(function(err) {
            if (err) {
              res.json('unsuccessfully');
            }
            else {
              console.log(question);
              res.json('success');
            }
          })
        }
      })
    })
  },

  destroy: function(req, res) {
  console.log("back-end destroy method");
  Question.remove({_id: req.params.id}, function(err) {
    console.log(req.params.id);
    if (err) {
      console.log("Delete ERROR", err);
      res.json({err:err});
    }
    else {
      console.log("delete Success");
      res.redirect(303, "/questions");
    }
  })
}


}

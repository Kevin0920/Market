var mongoose = require('mongoose');
var Question = mongoose.model("Question");
var User = mongoose.model("User");



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
    Question.find({}).sort('createdAt').exec(function(err, questions) {
      if (err) {
        console.log("fail get questions", err);
        res.json({err:err});
      }
      res.json(questions);
    })
  },


  oneQueston: function(req, res) {
    console.log("one one one",req.params.id);
    console.log("back end oneProduct");
    Question.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log('one question back end');
      }
      else {
        console.log(data);
        res.json(data);
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

var mongoose = require('mongoose');
var Survey = mongoose.model("Survey");
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


}

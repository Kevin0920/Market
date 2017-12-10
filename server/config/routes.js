var surveys = require('../controllers/mainControllers.js');
var path = require('path');


module.exports = function(app){

  app.post('/register', function(req, res) {
    surveys.register(req, res);
  })

  app.post('/login', function(req, res) {
    surveys.login(req, res);
  })



	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './client/dist' });
	})

}

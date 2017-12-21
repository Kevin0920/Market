var questions = require('../controllers/mainControllers.js');
var path = require('path');


module.exports = function(app){

  app.post('/register', function(req, res) {
    questions.register(req, res);
  })

  app.post('/login', function(req, res) {
    questions.login(req, res);
  })

  app.post('/questions/user/:id', function(req, res) {
    questions.create(req, res);
  })

  app.post('/like/:id', (req, res, next)=>{
    questions.like(req, res);
  })

  app.post("/search", function(req, res) {
    questions.search(req, res);
  })

  // create answer route
  app.post('/answers/:question_id/:user_id', function(req, res) {
    questions.createAns(req, res);
  })

  //create product route
  app.post('/products/user/:id', function(req, res) {
    questions.createPro(req, res);
  })

  app.get('/questions', function(req, res) {
    console.log('all questions route');
    questions.allQuestion(req, res);
  })

  app.get('/products', function(req, res) {
    console.log('all products route');
    questions.allProduct(req, res);
  })

  // display
  app.get('/products', function(req, res) {
    console.log("display route");
    questions.displayAll(req, res);
  })

  // retrieve one question
  app.get('/question/:id', (req, res, next)=>{
    console.log('one question route js');
    questions.oneQuestion(req, res);
  })

  // update one product detail
  app.put('/products/:id', (req, res, next)=>{
    console.log("update one product route");
    questions.oneProduct(req, res);
  })

  app.delete('/questions/:id',(req, res, next)=>{
    questions.destroy(req, res);
  })

  app.delete('/products/:id', (req, res)=>{
    questions.destroyPro(req, res);
  })

  app.get('/products/:id/user', (req, res)=>{
    questions.findPoster(req, res);
  })

	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './client/dist' });
	})

}

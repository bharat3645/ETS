var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
``});
router.get('/home', function(req, res, next) {
  res.render('home/index');
});
router.get('/ticket', function(req, res, next) {
  res.render('ticket');
});
router.get("/signup", function(req,res,next) {
  res.render("auth/signup")
})
router.get("/login", function(req,res,next) {
  res.render("auth/login")
})
router.get("/tos", function(req,res,next) {
  res.render("policy")
})


module.exports = router;

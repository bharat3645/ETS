var express = require('express');
var router = express.Router();
const data = require("../society_data.json")

const { signup, login , signupValidation, loginValidation, ensureAuthenticated } = require('../exports');

router.post('/login', loginValidation, login);

router.get('/user', ensureAuthenticated, (req,res)=>{res.status(200).json({user:req.user,status:200})});

router.post('/signup', signupValidation, signup);


router.get('/events', function(req, res, next) {
  res.json(data);
});
router.get('/events/:name', function(req, res, next) {
  res.json(data[req.params?.name] ?? {"message": "not found"});
});

module.exports = router;

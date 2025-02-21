var express = require('express');
var router = express.Router();
const data = require("../society_data.json")


router.get('/events', function(req, res, next) {
  res.json(data);
});
router.get('/events/:name', function(req, res, next) {
  res.json(data[req.params?.name] ?? {"message": "not found"});
});

module.exports = router;

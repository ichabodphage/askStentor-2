var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/:num1', function(req, res, next) {
  res.send(req.params.num1)
});

module.exports = router;

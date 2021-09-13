var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var crypto = require('crypto');
/* GET users listing. */

loginController.login.forEach(element => {
  switch(element.httpMethod.toLowerCase()){
    case "get":
      router.get(element.path,element.method)
      break;
    case "post":
      router.post(element.path,element.method)
    default:
      router.get(element.path,element.method)
  }
  
});


module.exports = router;

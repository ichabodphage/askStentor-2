var express = require('express');
var router = express.Router();
var db = require('../DBtools.js');
var termController = require('../controllers/termController');
var catagoryController = require('../controllers/catagoryController');
var similar = require("string-similarity-js");
var urlTools = require('../helpfulMethods/urlTools.js');

// term routes
termController.term.forEach(element => {
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
// catagory routes

router.get('/catagory/create', catagoryController.catagoryCreateGet);

router.post('/catagory/create', catagoryController.catagoryCreatePost);

router.get('/catagory/:id/delete', catagoryController.catagoryDeleteGet);

router.post('/catagory/:id/delete', catagoryController.catagoryDeletePost);

router.get('/catagory/:id/update', catagoryController.catagoryUpdateGet);

router.post('/catagory/:id/update', catagoryController.catagoryUpdatePost);

router.get('/catagory/:id', catagoryController.catagoryDetail);

router.get('/catagories', catagoryController.catagoryListShow);

module.exports = router;
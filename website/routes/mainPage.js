var express = require('express');
var router = express.Router();
var db = require('../DBtools.js');
var termController = require('../controllers/termController');
var catagoryController = require('../controllers/catagoryController');
var similar = require("string-similarity-js");
var urlTools = require('../helpfulMethods/urlTools.js');

router.get('/', async function(req ,res){
    var query = req.query
    console.log(query.search)
    var termArr;
    if(query.search === undefined){
        termArr =[]
    }else{

        var listToSearch = await db.Term.findAll()
        termArr = urlTools.sortSimilarities(query.search,listToSearch,"name",["shortdef","name"])
        termArr.length = 20
    }
    res.render("search",{termArray: termArr, urlArr: urlTools.urlBuilder(termArr)})
})

// term routes
router.get('/term/create', termController.termCreateGet);

router.post('/term/create', termController.termCreatePost);

router.get('/term/:id/delete', termController.termDeleteGet);

router.post('/term/:id/delete', termController.termDeletePost);

router.get('/term/:id/update', termController.termUpdateGet);

router.post('/term/:id/update', termController.termUpdatePost);

router.get('/term/:id', termController.termDetail);

router.get('/terms', termController.termListShow);

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
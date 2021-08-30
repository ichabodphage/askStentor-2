var express = require('express');
var router = express.Router();
var db = require('../DBtools.js');
var termController = require('../controllers/termController');
var catagoryController = require('../controllers/catagoryController');
var similar = require("string-similarity-js");
function css(request, response) {
    if (request.url === '/styles.css') {
      response.writeHead(200, {'Content-type' : 'text/css'});
      var fileContents = fs.readFileSync('./stylesheets/styles.css', {encoding: 'utf8'});
      response.write(fileContents);
    }
  }  
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
} 
router.get('/', async function(req ,res){
    var query = req.query
    console.log(query.search)
    var termArr;
    var URLArr =[]
    if(query.search === undefined){
     termArr =[]
    }else{
        var SimilarityList =[]
        var listToSearch = await db.Term.findAll()
        for(var i = 0; i< listToSearch.length;i++){
            SimilarityList.push({closeness: similar.stringSimilarity(query.search,listToSearch[i].name), name: listToSearch[i].name, shortdef: listToSearch[i].shortdef })
        }
        SimilarityList = sortByKey(SimilarityList,"closeness")
        SimilarityList.reverse()
        SimilarityList.length = 20
        console.log(SimilarityList)
        termArr = SimilarityList
    }
    for(var i = 0; i < termArr.length;i++){
        var URlToPush = termArr[i].name.replace("/","_")
        URLArr.push(URlToPush)
    }
    res.render("search",{termArray: termArr, urlArr: URLArr})
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
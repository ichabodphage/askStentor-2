var db = require('../DBtools.js');
var urlTools = require('../helpfulMethods/urlTools.js');

exports.catagoryListShow = async function(req, res) {
    var catList = await db.Catagory.findAll()
    var termCountArr =[]

    for(var i = 0; i < catList.length;i++){
        var catTerms = await catList[i].getTerms()
        termCountArr.push(catTerms.length)
    }
    res.render("categories", {catArray: catList, termCountArray: termCountArr, urlArr: urlTools.urlBuilder(catList)})
    
};

exports.catagoryDetail = async function(req, res) {
    var query = req.params.id.substring(1).replace("_","/")
    var categoryToRead = await db.Catagory.findOne({where: {name: query}})
    if(categoryToRead === null){
    res.render("error")
    }else{
    var terms = await categoryToRead.getTerms()

    res.render("categoryDesc",{cat: categoryToRead,termArray:terms,urlArr:urlTools.urlBuilder(terms)})
    }
};

exports.catagoryCreateGet = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory create GET');
};

exports.catagoryCreatePost = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory create POST');
};

exports.catagoryDeleteGet = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory delete GET');
};

exports.catagoryDeletePost = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory delete POST');
};

exports.catagoryUpdateGet = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory update GET');
};

exports.catagoryUpdatePost = function(req, res) {
    res.send('NOT IMPLEMENTED: Catagory update POST');
};
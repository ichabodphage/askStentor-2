var db = require('../DBtools.js');

exports.catagoryListShow = async function(req, res) {
    var catList = await db.Catagory.findAll()
    var termCountArr =[]
    var URLArr = []

    for(var i = 0; i < catList.length;i++){
        var catTerms = await catList[i].getTerms()
        termCountArr.push(catTerms.length)
        var URlToPush = catList[i].name.replace("/","_")

        URLArr.push(URlToPush)
    }
    res.render("categories", {catArray: catList, termCountArray: termCountArr, urlArr:URLArr})
    
};

exports.catagoryDetail = async function(req, res) {
    var query = req.params.id.substring(1).replace("_","/")
    var categoryToRead = await db.Catagory.findOne({where: {name: query}})
    if(categoryToRead === null){
    res.render("error")
    }else{
    var URLArr = []
    var terms = await categoryToRead.getTerms()
    for(var i = 0; i < terms.length;i++){
        var URlToPush = terms[i].name.replace("/","_")
        URLArr.push(URlToPush)
    }
    res.render("categoryDesc",{cat: categoryToRead,termArray:terms,urlArr:URLArr})
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
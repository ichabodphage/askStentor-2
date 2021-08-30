var db = require('../DBtools.js');

exports.termListShow = function(req, res) {
    res.send('comming soon');
};

//processes a get request and shows the client the term asked for within the query
exports.termDetail = async function(req, res) {
    var query = req.params.id.substring(1).replace("_", "/")
    var termToRead = await db.Term.findOne({ where: { name: query } })
    if(termToRead === null){
        res.render("error")
    }else{
    res.render("termDesc" , {term: termToRead})
    }
    
};

exports.termSearch = async function(req, res) {
    var query = req.params.id
    console.log(query)
    res.send(query)

};


exports.termCreateGet = function(req, res) {
    res.send('for stentors eyes only');
};

exports.termCreatePost = function(req, res) {
    res.send('only askStentor staff members can make POST requests');
};

exports.termDeleteGet = function(req, res) {
    res.send('for stentors eyes only');
};

exports.termDeletePost = function(req, res) {
    res.send('only askStentor staff members can make POST requests');
};

exports.termUpdateGet = function(req, res) {
    res.send('NOT IMPLEMENTED: Term update GET');
};

exports.termUpdatePost = function(req, res) {
    res.send('only askStentor staff members can make POST request');
};
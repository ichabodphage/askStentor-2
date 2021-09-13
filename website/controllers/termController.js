<<<<<<< HEAD
var db = require('../DBtools.js');
const route = require("./route.js")
var urlTools = require('../helpfulMethods/urlTools.js');
const e = require('express');
exports.term = [
    new route("/term/:id", "get", async function (req, res) {
        var query = req.params.id.substring(1).replace("_", "/")
        var termToRead = await db.Term.findOne({ where: { name: query } })
        if (termToRead === null) {
            res.render("error")
        } else {
            res.render("termDesc", { term: termToRead })
        }

    }),
    new route("/", "get", async function (req, res) {
        var query = req.query
        console.log(query.search)
        var termArr;
        if (query.search === undefined) {
            termArr = []
        } else {

            var listToSearch = await db.Term.findAll()
            termArr = urlTools.sortSimilarities(query.search, listToSearch, "name", ["shortdef", "name"])
            termArr.length = 20
        }
        res.render("search", { termArray: termArr, urlArr: urlTools.urlBuilder(termArr) })
    }),
    new route("/create", "get", async function (req, res) {
        var sesh = req.session;
        if (sesh.userName !== undefined) {
            var login = await db.User.findOne({ where: { username: sesh.userName } })
            if (login == null) {
                res.redirect("/")
            } else {
                res.render("terminput")
            }
        }else{
            res.redirect("/")
        }
    }),
    new route("/create", "post", async function (req, res) {
        var cat = await db.Catagory.findOne({ where: { name: req.body.category } })
        delete req.body.category
        var newTerm = await db.Term.create(req.body)
        await cat.addTerm(newTerm)
        console.log("term " +newTerm.name +" has been added to the database")
        res.render("terminput")
    }),
    new route("/delete", "get", async function (req, res) {
        var sesh = req.session;
        if (sesh.userName !== undefined) {
            var login = await db.User.findOne({ where: { username: sesh.userName } })
            if (login == null) {
                res.redirect("/")
            } else {
                res.render("termDelete")
            }
        }else{
            res.redirect("/")
        }
    }),
    new route("/delete", "post", async function (req, res) {
        var deleteTerm = await db.Term.findOne({ where: { name: req.body.name } })
        await deleteTerm.destroy()
        res.render("termDelete")
    })
]

=======
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
>>>>>>> 36329e306855b09fac9231c22778623294e78c38

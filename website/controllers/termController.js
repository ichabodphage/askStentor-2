var db = require('../DBtools.js');
const route = require("../appClasses/route.js")
var urlTools = require('../helpfulMethods/urlTools.js');
const e = require('express');
exports.term = [
    //route for displaying information about a term
    new route("/term/:id", "get", async function (req, res) {
        // replace any underscore within the ID with a slash as terms with slashes must have their slashes replaced with underscores for proper routing

        var query = req.params.id.substring(1).replace("_", "/")
        var termToRead = await db.Term.findOne({ where: { name: query } })
        // retunrn an error if there is no term to read
        if (termToRead === null) {
            res.render("error")
        } else {
            res.render("termDesc", { term: termToRead })
        }

    }),

    //route for displaying the search menu for the terms
    new route("/", "get", async function (req, res) {
        var query = req.query
        var termArr;

        // return an empty term array if there is no search, otherwise preform a search
        if (query.search === undefined) {
            termArr = []
        } else {

            // gets all terms and compare them with the query, then display the 20 most similar terms
            var listToSearch = await db.Term.findAll()
            termArr = urlTools.sortSimilarities(query.search, listToSearch, "name", ["shortdef", "name"])
            termArr.length = 20
        }
        res.render("search", { termArray: termArr, urlArr: urlTools.urlBuilder(termArr) })
    }),

    //route for creation of terms
    new route("/create", "get", async function (req, res) {
        var sesh = req.session;

        // standard checking if a valid user is loged in
        if (sesh.username !== undefined) {
            var catArr = await db.Catagory.findAll();
            res.render("termInput", { catagoryArray: catArr })
        } else {
            res.redirect("/")
        }
    }),

    //route to POST information from the termInput menu
    new route("/create", "post", async function (req, res) {

        // find the catagory within the POST request to insert the term into the catagory
        var cat = await db.Catagory.findOne({ where: { name: req.body.category } })
        delete req.body.category

        //replace all spaces with dashes to prevent any errors that would occur for searching
        req.body.name.replace(" ", "-")

        // add the term into the database and associate it with its catagory
        var newTerm = await db.Term.create(req.body)
        await cat.addTerm(newTerm)

        console.log("term " + newTerm.name + " has been added to the database")
        res.render("terminput", { catagoryArray: await db.Catagory.findAll() })
    }),

    //route for displaying the delete menu
    new route("/delete", "get", async function (req, res) {
        var sesh = req.session;

        // standard checking if a valid user is loged in
        if (sesh.username !== undefined) {
            res.render("termDelete")
        } else {
            res.redirect("/")
        }
    }),

    //route for executing deletion of a term
    new route("/delete", "post", async function (req, res) {
        var deleteTerm = await db.Term.findOne({ where: { name: req.body.name } })
        await deleteTerm.destroy()
        res.render("termDelete")
    })
]


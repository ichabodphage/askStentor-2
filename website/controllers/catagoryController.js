const route = require("../appClasses/route.js")
var db = require('../DBtools.js');
var urlTools = require('../helpfulMethods/urlTools.js');
exports.catagory = [
    //route for displaying the list of catagories
    new route("/catagories", "get", async function (req, res) {
        var catList = await db.Catagory.findAll()
        var termCountArr = []

        // loop over all catagories and get the number of terms in each catagory
        for (var i = 0; i < catList.length; i++) {
            var catTerms = await catList[i].getTerms()
            termCountArr.push(catTerms.length)
        }

        res.render("categories", { catArray: catList, termCountArray: termCountArr, urlArr: urlTools.urlBuilder(catList) })
    }),

    //route for retrieving terms witin a selected catagory
    new route("/catagory/:id", "get", async function (req, res) {
        // because slashes indicate new routes, catagories with slashes have their slashes replaced with underscores within their queries
        var query = req.params.id.substring(1).replace("_", "/")

        // render an error if the cataory does not exist, otherwise show the catagory with its terms
        var categoryToRead = await db.Catagory.findOne({ where: { name: query } })
        if (categoryToRead === null) {
            res.render("error")
        } else {
            var terms = await categoryToRead.getTerms()
            res.render("categoryDesc", { cat: categoryToRead, termArray: terms, urlArr: urlTools.urlBuilder(terms) })
        }
    }),

    // route for creating catagories
    new route("/catagoryManager/create", "get", async function (req, res) {
        var sesh = req.session;
        // standard checking if a valid user is loged in
        if (sesh.username !== undefined) {
            res.render("catagoryinput")
        } else {
            res.redirect("/")
        }
    }),

    //route to POST information from the termInput menu
    new route("/catagoryManager/create", "post", async function (req, res) {
        // replace any spaces within the catagory name of the post request to eliminate any DB errors
        req.body.name.replace(" ", "-")
        var newTerm = await db.Catagory.create(req.body)
        res.render("catagoryinput")
    }),

    // route that shows the catagory deletion menu
    new route("/catagoryManager/delete", "get", async function (req, res) {
        var sesh = req.session;
        // standard checking if a valid user is loged in
        if (sesh.username !== undefined) {
            res.render("catagoryDelete")
        } else {
            res.redirect("/")
        }
    }),

    // route to DELETE a selected catagory
    new route("/catagoryManager/delete", "post", async function (req, res) {
        db.Catagory.findOne({ where: { name: req.body.name } }).then(async (res) => {
            await res.destroy()
        })
        res.render("termDelete")
    })
]

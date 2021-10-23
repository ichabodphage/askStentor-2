var db = require('../DBtools.js');
const hasher = require("../helpfulMethods/securityTools")
const route = require("../appClasses/route.js")

exports.index = [
    //route for index
    new route("/", "get", async function (req, res) {
        console.log(req.session)
        res.render('index')
    }),
    //route for showing about menu
    new route("/about", "get", async function (req, res) {
        res.render('about')
    }),

]

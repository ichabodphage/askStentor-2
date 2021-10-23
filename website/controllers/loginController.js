var db = require('../DBtools.js');
const hasher = require("../helpfulMethods/securityTools")
const route = require("../appClasses/route.js")

exports.login = [
    //route for standard login page
    new route("/", "get", async function (req, res) {
        var sesh = req.session;
        // standard not allowing a non user into this section of the site
        if (sesh.username !== undefined) {
            res.redirect("/login/user")
        } else {
            res.render('login', { msg: "" })
        }
    }),
    //route for showing the users homepage
    new route("/user", "get", async function (req, res) {
        var sesh = req.session;
        // standard not allowing a non user into this section of the site
        if (sesh.username !== undefined) {
            res.render('userhome', { user: sesh.username, addTerms: sesh.addTerms, addCatagories: sesh.addCatagories, addStaff: sesh.addStaff })
        } else {
            res.redirect("/")
        }

    }),
    //route for sending login informaton to the server
    new route("/", "post", async function (req, res) {
        try {
            var hashedPword = hasher.makeHash(req.body.pWord)
            var login = await db.StaffUser.findOne({ where: { username: req.body.uName } })


            // send an error if the username is not found within the database
            if (login === null) {
                res.render('login', { msg: "error, username \"" + req.body.uName + "\" not found" })

            } else if (login.password === hashedPword) {
                // procede as normal if the username and password are correct
                var sesh = req.session;
                sesh.username = login.username
                sesh.addTerms = login.addTerms
                sesh.addCatagories = login.addCatagories
                sesh.addStaff = login.addStaff
                console.log(req.session)
                res.redirect("/login/user")

            } else {
                // procede as normal if the username and password are correct
                res.render('login', { msg: "error, incorrect password" })
            }
        } catch (e) {
            res.render("error")
        }
    }),
    //route for creation of new staff members
    new route("/create", "get", async function (req, res) {
        var sesh = req.session;
        // standard not allowing a non user into this section of the site
        if (sesh.username !== undefined && sesh.addStaff) {
            res.render('staffInput', { msg: "" })
        } else {
            res.redirect("/")
        }
    }),
    new route("/create", "post", async function (req, res) {
        try {
            req.body.username.replace(" ", "-")
            req.body.password = hasher.makeHash(req.body.password)

            //replace each permission wih true or false as they are stored as booleans in the schema
            if (req.body.addTerms == 'on') {
                req.body.addTerms = true;
            } else {
                req.body.addTerms = false;
            }
            if (req.body.addCatagories == 'on') {
                req.body.addCatagories = true;
            } else {
                req.body.addCatagories = false;
            }
            if (req.body.addStaff == 'on') {
                req.body.addStaff = true;
            } else {
                req.body.addStaff = false;
            }

            // re render the staff input page in the event that another staff member needs to be added
            await db.StaffUser.create(req.body)

            res.render("staffInput")
        } catch (e) {
            res.render("error")
        }
    })
]

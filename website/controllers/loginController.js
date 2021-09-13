var db = require('../DBtools.js');
const hasher = require("../helpfulMethods/securityTools")
const route = require("./route.js")

exports.login = [
    new route("/","get",async function(req, res) {
        var sesh = req.session;
        if(sesh.userName!== undefined){
            var login = await db.User.findOne({ where: { username: sesh.userName } })
                if(login !== null){
                    res.redirect("/login/user")
                }else{
                    res.redirect("/")
                }
        }else{
            res.render('login',{msg:""})
        }
    }),
    new route("/user","get",async function(req, res) {
        var sesh = req.session;
        if(sesh.userName!== undefined){
            var login = await db.User.findOne({ where: { username: sesh.userName } })
            if(login !== null){
                res.render('userhome',{user: login.username})
            }else{
                res.redirect("/")
            }
        }else{
            res.redirect("/")
        }

    }),
    new route("/","post",async function(req, res) {
        var hashedPword = hasher.makeHash(req.body.pWord)
        var login = await db.User.findOne({ where: { username: req.body.uName } })
        console.log(login)
        if(login === null ){
          res.render('login',{msg:"error, username \""+req.body.uName +"\" not found"})
        }else if( login.password === hashedPword){
          var sesh = req.session;
          sesh.userName = req.body.uName
          console.log(req.session)
          res.redirect("/login/user")

        }else{
          res.render('login',{msg:"error, incorrect password"})
        }
    })
]

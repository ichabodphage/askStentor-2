var loginController = require('../controllers/loginController');
var routeManager = require("../appClasses/routeManager")

// term routes
var userRouter = new routeManager("/login",loginController.login)



module.exports = userRouter;

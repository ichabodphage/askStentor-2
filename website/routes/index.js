var indexController = require('../controllers/indexController');
var routeManager = require("../appClasses/routeManager")

// term routes
var indexRouter = new routeManager("/",indexController.index)
module.exports = indexRouter;
var termController = require('../controllers/termController');
var catagoryController = require('../controllers/catagoryController');
var routeManager = require("../appClasses/routeManager")

// term routes
var termCatRouter = new routeManager("/ask",termController.term.concat(catagoryController.catagory))


module.exports = termCatRouter;
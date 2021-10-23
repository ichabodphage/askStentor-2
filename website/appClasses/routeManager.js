var express = require('express');
//class that manages different routes upon a specific path
module.exports = class routeManager{
    constructor(path, routes){
        this.router = express.Router();
        this.path = path
        this.routes = routes
        this.routes.forEach(element => {
            switch(element.httpMethod.toLowerCase()){
                case "get":
                  this.router.get(element.path,element.method)
                  break;
                case "post":
                  this.router.post(element.path,element.method)
                default:
                  this.router.get(element.path,element.method)
              }
        });
    }
}
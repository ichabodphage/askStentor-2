<<<<<<< HEAD
module.exports  = class route{
    constructor(path ,action ,callback ){
        this.path = path
        this.httpMethod = action
        this.method = callback
    }
    runRoute(req,res){
        this.method(req,res)
    }
=======
module.exports  = class route{
    constructor(path ,action ,callback ){
        this.path = path
        this.httpMethod = action
        this.method = callback
    }
    runRoute(req,res){
        this.method(req,res)
    }
>>>>>>> e3452b36e699ef304e1317fc9f547d073718f6af
}
module.exports  = class route{
    constructor(path ,action ,callback ){
        this.path = path
        this.httpMethod = action
        this.method = callback
    }
    runRoute(req,res){
        this.method(req,res)
    }
}
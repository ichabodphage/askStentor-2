var crypto = require('crypto');

exports.makeHash = function(input){
    var hash = crypto.createHash('sha384');
    data = hash.update(input, 'utf-8');
    return data.digest('hex')
}
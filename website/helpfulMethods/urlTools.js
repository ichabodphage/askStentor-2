var db = require('../DBtools.js');
var similar = require("string-similarity-js");

//method that sorts an array of objects from a specific instance variable within the object
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
} 

// takes an array of strings and makes them compatable as a URL
exports.urlBuilder = function(itemsToUrl){
    var output = []
    for(var i = 0; i < itemsToUrl.length;i++){
        var URlToPush = itemsToUrl[i].name.replace("/","_")
        output.push(URlToPush)
    }
    return output
}

// takes string itemToCompare and sorts the array comparisonList using comparisonInstanceVar as a key.
// returns an array of sorted objects that also contain extra instance variables bassed upon items found in instanceVarsToInclude
exports.sortSimilarities = function(itemToCompare,comparisonList,comparisonInstanceVar,instanceVarsToInclude){
    var output = []
    for(var i = 0; i < comparisonList.length;i++){
        var outputBuilder = {closeness: similar.stringSimilarity(itemToCompare,comparisonList[i][comparisonInstanceVar])}
        instanceVarsToInclude.forEach(element => {
            outputBuilder[element] = comparisonList[i][element]
        });

        output.push(outputBuilder)
    }
    output = sortByKey(output,"closeness")
    output.reverse()
    return output
}
class termFormater {
    static fixLongDef(inputSentance) {
        var output = inputSentance
        if (output.substring(0, 1) !== output.substring(0, 1).toUpperCase()) {
            output = output.substring(0, 1).toUpperCase() + output.substring(1, output.length)
        }
        for (var i = 0; i < output.length; i++) {
            if (output.substring(i, i + 1) == '.' && output.substring(i + 1, i + 2) !== ' ') {
                output = output.substring(0, i + 1) + ' ' + output.substring(i + 1, output.length)
            }
            if (output.substring(i, i + 2) == '. ' && output.substring(i + 2, i + 3) != output.substring(i + 2, i + 3).toUpperCase()) {
                output = output.substring(0, i + 2) + output.substring(i + 2, i + 3).toUpperCase() + output.substring(i + 3, output.length)
            }
        }
        if (output.substring(output.length - 2, output.length-1) != '.') {
            output += '.'
        }
        return output
    }
    static fixName(inputTerm){
        var output = inputTerm
        if (output.substring(0, 1) != output.substring(0, 1).toUpperCase()) {
            output = output.substring(0, 1).toUpperCase() + output.substring(1, output.length)
        }
        console.log(output)
        return output
    }
}
module.exports = termFormater
var moment = require('moment');
//utility functions for displaying trade data
exports.capitalize = function(string) {
    return string[0].toUpperCase()+string.slice(1);
}
exports.round = function(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};
exports.abbreviateAsset = function(string) {
    if(string == "BITCRYSTALS") {
        return "bcy"
    } else if (string == "RUSTBITS") { 
        return "rustbits"
    } else {
        return string
    }
}
exports.formatDateMD = function(date) {
    return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format('M/DD');
}
exports.formatDateMDY = function(date) {
    return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format('M-DD-YY');
}
exports.formatDateMDYnotime = function(date) {
    return moment(date, "MM-DD-YYYY").format('M-DD-YY');
}


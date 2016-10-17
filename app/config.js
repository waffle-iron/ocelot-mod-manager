/**
* @Date:   2016-10-16T19:02:51-04:00
* @Last modified time: 2016-10-16T20:23:33-04:00
*/

var path = require('path')

var pathDevelopment = path.join(__dirname, '..');
var pathProduction = path.join(__dirname, '..', '..');

var config = {
    isDevelopment: false,
    path: {
        development: pathDevelopment,
        production: pathProduction
    }
}

module.exports = config;

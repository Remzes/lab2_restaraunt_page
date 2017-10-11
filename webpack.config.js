var path = require("path");

var DIST_DIR   = path.join(__dirname, "/views/es5"),
    CLIENT_DIR = path.join(__dirname, "/views/js");

module.exports = {
    context: CLIENT_DIR,

    entry: "./main",

    output: {
        path:     DIST_DIR,
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['.js']
    }
};
const path = require("path");

module.exports = {
    entry: {
        index: "./js/index.js",
        blog: "./js/blog-tag.js",
        sejour: "./js/sejour.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "docs/js")
    }
}
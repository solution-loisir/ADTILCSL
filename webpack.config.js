const path = require("path");

module.exports = {
    entry: {
        index: "./js/index.js",
        tagRender: "./js/tagRender.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "docs/js")
    }
}
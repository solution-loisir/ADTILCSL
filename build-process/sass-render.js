const sass = require('sass');
const fibers = require('fibers');

module.exports = (src, dest) => {
    return new Promise((resolve, reject) => {
        sass.render({
            file: src,
            fiber: fibers
        }, (error, result) => {
            if(error) reject(error);
            resolve(result);
            console.log(`Writing ${dest} from ${result.stats.entry} in ${result.stats.duration}ms.`);
        });
    });
}
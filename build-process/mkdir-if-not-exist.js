const { existsSync, mkdir } = require('fs-extra');
const { dirname } = require('path');

module.exports = path => {
    if(!existsSync(dirname(path))) return mkdir(dirname(path), {recursive: true});
    return `${path} directory already exist.`;
}
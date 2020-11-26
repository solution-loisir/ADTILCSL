const uslug = require('uslug');

module.exports = text => uslug(text).normalize('NFD').replace( /[\u0300-\u036f]/g, '' );
module.exports = text => text.toString()
    .toLowerCase()
    .normalize('NFD')
    .trim()
    .replace( /[\u0300-\u036f]/g, '') 
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
module.exports = text => {
    return text.replace(/\n/g, ' ').toLowerCase()
    .replace(/<.*?>/g, '')
    .replace(/\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|de|des|dont|te|ta|ton|tes|t'en|en|un|une|on|ont|a|eu|ai|ais|ait|est|c'est|s'est|ces|ses|ce|se|pour|si|de|et|ou|sauf|moi|dans|sur|mais|oui|non|pas)\b/g, '')
    .replace(/l'|d'|à/g, '')
    .replace(/\.|,|\?|\(|\)|!|/g, '')
    .replace(/ {2,}/g, ' ')
    .replace(/(^ | $)/g, '');
}
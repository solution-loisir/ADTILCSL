module.exports = date => {
    const dateTime = date
    .toLocaleString('fr-CA', {timeZone: 'utc', year: 'numeric' , month: 'long', day: 'numeric'})
    .replace(/M01/, 'jan.')
    .replace(/M02/, 'févr.')
    .replace(/M03/, 'mars')
    .replace(/M04/, 'avr.')
    .replace(/M05/, 'mai')
    .replace(/M06/, 'juin')
    .replace(/M07/, 'juil.')
    .replace(/M08/, 'août')
    .replace(/M09/, 'sept.')
    .replace(/M10/, 'oct.')
    .replace(/M11/, 'nov.')
    .replace(/M12/, 'déc.');
    const year = dateTime.match(/^\d\d\d\d/g);
    const month = dateTime.match(/\b\D+\b/g);
    const day = dateTime.match(/\d\d$|\d$/g);
    return `${day[0]} ${month[0]} ${year[0]}`;
}
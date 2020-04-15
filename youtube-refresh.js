const https = require('https');
const fs = require('fs');
require('dotenv').config();

const OUTPUT = fs.createWriteStream('./_src/_data/youtube.json');

https.get(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${process.env.YOUTUBE_CHANNELID}&type=video&maxResults=20&order=date&key=${process.env.YOUTUBE_KEY}`, res => {
    res.pipe(OUTPUT)
    .on('error', error => {
        console.error(error);
        //Ending writable stream on error
        this.end();
    });
}).on('error', error => console.error(error));
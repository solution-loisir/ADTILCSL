const https = require('https');
const fs = require('fs');
const { pipeline } = require('stream');
require('dotenv').config();

//Creating Writable stream
const OUTPUT = fs.createWriteStream('./_src/_data/youtube.json');

https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.YOUTUBE_CHANNELID}&type=video&maxResults=20&order=date&key=${process.env.YOUTUBE_KEY}`, res => {
    //Piping res (IncomingMessage: Readable) to OUTPUT (Writable)
    //The pipeline method wilL manage stream flow and errors!
    pipeline(res, OUTPUT, error => {
        if(error) {
            console.error(error.stack);
        } else {
            console.log('Transfering YouTube data is done!');
        }
    });  
}).on('error', error => console.error(error.stack));
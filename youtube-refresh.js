const { get } = require('https');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const site = require("./_src/_data/site")();
require('dotenv').config();

const formationOUTPUT = createWriteStream('./_src/_data/formationYoutube.json');
const blogOUTPUT = createWriteStream('./_src/_data/blogYoutube.json');

async function getPlaylist(id, output, key = process.env.YOUTUBE_KEY) {
    get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&type=video&maxResults=20&order=date&key=${key}`, res => {
        pipeline(res, output, error => {
            if(error) {
                console.error(error.stack);
            } else {
                console.log('Transfering YouTube data is done!');
            }
        });  
    }).on('error', error => console.error(error.stack));
}
Promise.all([
    getPlaylist(site.blogList, blogOUTPUT),
    getPlaylist(site.formationList, formationOUTPUT)
])
.catch(error => console.error("Error in getPlayList: ", error.stack));
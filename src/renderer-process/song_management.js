'use strict';

const ipc = require('electron').ipcRenderer
const fs = require('fs');
const Onsong = require('./onsong');

const addSongsBtn = document.getElementById('add-songs-btn');
const goLiveBtn = document.getElementById('go-live-btn');

addSongsBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog');
});

goLiveBtn.addEventListener('click', function (event) {
    ipc.send('go-live-event');
});

ipc.on('selected-directory', function (event, path) {
    document.getElementById('file-contents').innerHTML = `You selected: ${path}`
    for (var i = 0; i < path.length; i++) {
        fs.readFile(path[i], 'utf8', (err, data) => {
            let song = new Onsong(data);
            console.log(JSON.stringify(song.blocks));
        });
    }
});
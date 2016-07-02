
const electron = require('electron');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['multiSelections'],
        filters: [{ name: 'Onsong', extensions: ['onsong']}]
    }, function (files) {
        if (files) event.sender.send('selected-directory', files)
    })
})

// ipc.on('go-live-event', function(event) {
//     mainWindow.setFullScreen(true);
//     mainWindow.setMenu(null);
// });
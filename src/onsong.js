
let $songTitle = Symbol('onsong title');
let $songBlocks = Symbol('onsong blocks');

class Onsong {
    constructor (songData) {
        this._intialize(songData);
    }

    get title() {
        return this[$songTitle];
    }

    get blocks() {
        return this[$songBlocks];
    }

    _intialize (songData) {
        let lines = songData.split(/\r\n|\r|\n/g);
        let filteredLines = lines.filter(this._chordFilter)
                .filter(this._reservedKeywordFilter);

        this[$songBlocks] = new Array();
        let tempBlock = new Array();
        for (let i = 0; i < filteredLines.length; i++) {
            if (!filteredLines[i].trim()) {
                if (tempBlock.length !== 0) {
                    this[$songBlocks].push(tempBlock);
                }
                tempBlock = new Array();
            } else {
                tempBlock.push(filteredLines[i]);
            }
        }

        this[$songTitle] = this[$songBlocks].splice(0, 1)[0];
    }

    _chordFilter(line) {
        let chords = line.trim().split(/\b\s+/);
        let chordRegex = new RegExp(/^[A-G](b|#)?((m(aj)?|M|aug|dim|sus)([2-7]|9|13)?)?(\/[A-G](b|#)?)?$/);
        for ( let i = 0; i < chords.length; i++) {
            if (!chords[i].match(chordRegex)) {
                return true;
            }
        }
        return false;
    }

    _reservedKeywordFilter(line) {
        let keywordRegex = new RegExp(/^(verse|chorus|bridge|pre-chorus|prechorus|intro|interlude|capo).*/i);
        return !line.trim().match(keywordRegex);
    }
}

module.exports = Onsong;

let $songTitle = Symbol('onsong title');
let $songBlocks = Symbol('onsong blocks');

class Onsong {
    constructor (songData) {
        this._intialize(songData)
    }

    get blocks() {
        return this[$songBlocks];
    }

    _intialize (songData) {
        let lines = songData.split(/\r\n|\r|\n/g);
        this[$songBlocks] = lines.filter(this._nonChordFilter)
                .filter(this._nonReservedKeywordFilter);
    }

    _nonChordFilter(line) {
        let chords = line.trim().split(/\b\s+/);
        let chordRegex = new RegExp(/^([A-G]|[ABEG]♭|[CF]♯?)(maj|min|[Mm+°])?6?(aug|d[io]m|ø)?7?$/);
        for ( let i = 0; i < chords.length; i++) {
            if (!chords[i].match(chordRegex)) {
                return true;
            }
        }
        return false;
    }

    _nonReservedKeywordFilter(line) {
        let keywordRegex = new RegExp(/^(verse|chrorus|bridge|pre-chorus|prechorus|intro|interlude).*/i);
        return !line.trim().match(keywordRegex);
    }
}

module.exports = Onsong;
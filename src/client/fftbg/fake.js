const fs = require('fs');
const path = require('path');

module.exports.itemInfo = () => {
    return {
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resources', 'fftbg_fake', 'infoitem.txt'), 'utf-8')
    };
};

module.exports.tournamentTeam = async (_, teamName) => {
    return {
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resources', 'fftbg_fake', 'fake_tournament', `${teamName}.txt`), 'utf-8')
    }
}

module.exports.tournamentList = async () => {
    return {
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resources', 'fftbg_fake', '/index.html'), 'utf-8'),
    }
}
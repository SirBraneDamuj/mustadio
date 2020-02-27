const fs = require('fs');
const path = require('path');

const readFakeFile = (filename) => fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resources', 'fftbg_fake', filename), 'utf-8');

module.exports.classInfo = () => {
    return {
        data: readFakeFile('classhelp.txt'),
    };
};

module.exports.itemInfo = () => {
    return {
        data: readFakeFile('infoitem.txt'),
    };
};

module.exports.abilityInfo = () => {
    return {
        data: readFakeFile('infoability.txt'),
    };
};

module.exports.statusInfo = () => {
    return {
        data: readFakeFile('infostatus.txt'),
    };
};

module.exports.zodiacInfo = () => {
    return {
        data: readFakeFile('zodiachelp.txt'),
    };
};

module.exports.monsters = () => {
    return {
        data: readFakeFile('Monsters.txt'),
    };
};

module.exports.monsterSkills = () => {
    return {
        data: readFakeFile('MonsterSkills.txt'),
    };
};

module.exports.tournamentTeam = async (_, teamName) => {
    return {
        data: readFakeFile(`fake_tournament/${teamName}.txt`),
    };
};

module.exports.tournamentMaps = async () => {
    return {
        data: readFakeFile(`fake_tournament/maps.txt`),
    };
};

module.exports.tournamentWinners = async (tournamentId) => {
    let filename = '';
    if (tournamentId === 'start') {
        filename = 'winner_start.txt';
    } else if (tournamentId === 'half') {
        filename = 'winner_half.txt';
    } else {
        filename = 'winner_complete.txt';
    }
    return {
        data: readFakeFile(`fake_tournament/${filename}`),
    };
};

module.exports.tournamentList = async () => {
    return {
        data: readFakeFile('index.html'),
    };
};
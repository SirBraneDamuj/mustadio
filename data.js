const fs = require('fs');

const initializeTeams = () => ({
  red: [],
  blue: [],
  green: [],
  yellow: [],
  black: [],
  white: [],
  purple: [],
  brown: [],
  champion: [],
});

let teams = fs.existsSync('teams.json') ? JSON.parse(fs.readFileSync('teams.json')) : initializeTeams();
let units = fs.existsSync('units.json') ? JSON.parse(fs.readFileSync('units.json')) : {};
let state = 'match';
let currentTeam1 = 'red';
let currentTeam2 = 'blue';


//Blue Team: HV5H the Bard, NBD Rab the Skeleton, Mayfu the Archaic Demon, JimmyKetz the Ochu
module.exports.setTeamForMsg = (msg) => {
  const tokens = msg.split(": ");
  const teamName = tokens[0].split(" ")[0].toLowerCase();
  const members = tokens[1].split(", ").map(s => s.split(" the ")[0]);
  teams[teamName] = members;
};

//Spartan Paladin - Male - Aquarius - 46 - 58 - Knight - Time Magic - Auto Potion - Dual Wield - Move+3 - Platinum Sword - Ice Brand - Genji Helmet - Chain Mail - Jade Armlet - Head Break, Magic Break, Speed Break, Power Break, Night Sword - Slow 2, Immobilize, Reflect, Quick
module.exports.setUnitForMsg = (msg) => {
    const sanitized = msg.replace("Will-O-Wisp", "WillOWisp")
        .replace("Move-", "Move_")
        .replace("-Potion", "_Potion")
        .replace("-Ether", "_Ether")
        .replace("N-Kai", "NKai");
    const tokens = sanitized.split('-').map(s => s.trim());
    const mainAbilities = tokens[tokens.length - 2];
    const subAbilities = tokens[tokens.length - 1];
    const gear = tokens.slice(10, tokens.length - 2);
    const unit = {
        name: tokens[0],
        gender: tokens[1],
        zodiac: tokens[2],
        brave: tokens[3],
        faith: tokens[4],
        class: tokens[5],
        activeSkill: tokens[6],
        reactSkill: tokens[7],
        supportSkill: tokens[8],
        moveSkill: tokens[9],
        mainAbilities,
        subAbilities,
        gear,
        raw: msg,
    };
    if (!units[unit.name]) {
        units[unit.name] = unit;
    }
}

module.exports.reinitialize = () => {
    teams = initializeTeams();
    units = {};
}

module.exports.unitsForTeam = (teamName) => {
    const team = teams[teamName] || [];
    return teams[teamName].map(unitName => units[unitName]);
}

module.exports.teamNames = ['champion', 'red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'brown'];

//Betting is open for red vs blue. Use !bet [amount] [team] to place a wager!
module.exports.startNewMatch = (matchMsg) => {
    state = 'match';
    const tokens = matchMsg.split(' ');
    currentTeam1 = tokens[4];
    currentTeam2 = tokens[6].slice(0, -1);
};

module.exports.currentMatch = () => [currentTeam1, currentTeam2]
module.exports.currentState = () => state;
module.exports.save = () => {
    fs.writeFileSync('teams.json', JSON.stringify(teams));
    fs.writeFileSync('units.json', JSON.stringify(units));
};
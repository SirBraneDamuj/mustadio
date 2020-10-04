const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');

const parseMonsterSkillsLine = (monsterSkills, monsterSkillsLine) => {
    const skills = monsterSkillsLine.split('|');
    if (!monsterSkills.skills) {
        monsterSkills.skills = [];
    }
    monsterSkills.skills.push(skills);
};

const parseMonstersLine = (monsters, monstersLine) => {
    const monster = monstersLine;
    if (!monsters.monsters) {
        monsters.monsters = [];
    }
    monsters.monsters.push(monster);
};

const skillsLoader = new DumpLoader(client.monsterSkills, parseMonsterSkillsLine);
const monstersLoader = new DumpLoader(client.monsters, parseMonstersLine);

module.exports.getSkillsForMonster = (monsterName) => {
    const { monsters } = monstersLoader.getData();
    const { skills } = skillsLoader.getData();
    const index = monsters.indexOf(monsterName);
    return skills[index];
}

module.exports.getAllMonsterSkills = () => {
    const { monsters } = monstersLoader.getData();
    const { skills } = skillsLoader.getData();
    const skillsMap = {};
    for (const [index, monster] of monsters.entries()) {
        skillsMap[monster] = skills[index];
    }
    return skillsMap;
}

module.exports.reload = async (version) => Promise.all([
    skillsLoader.reload(version),
    monstersLoader.reload(version),
])
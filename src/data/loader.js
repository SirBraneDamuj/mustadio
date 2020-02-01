const { GENDERS } = require('./constants');

module.exports.loadTeamFromString = (teamData) => {
    let delimiter = '\r\n';
    if (teamData.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    const tokens = teamData.split(delimiter).slice(3).filter(s => s !== '');
    let index = 0;
    let lastUnitIndex = -1;
    const unitStrings = [];
    while (unitStrings.length < 4 && index < tokens.length) {
        const thisToken = tokens[index];
        if (GENDERS.includes(thisToken)) {
            if (lastUnitIndex != -1) {
                unitStrings.push(tokens.slice(lastUnitIndex, index - 1));
            }
            lastUnitIndex = index - 1;
        }
        index += 1;
    }
    unitStrings.push(tokens.slice(lastUnitIndex));
    if (unitStrings.length != 4) {
        throw new Error(`found unexpected number (${unitStrings.length}) of units`);
    }

    const units = unitStrings
        .map((unitTokens) => {
            const gender = unitTokens[1];
            const monster = gender === 'Monster';
            const mainAbilities = unitTokens[unitTokens.length - 2].split(', ');
            const subAbilities = unitTokens[unitTokens.length - 1].split(', ');
            const gear = unitTokens.slice(10, unitTokens.length - 2);
            return {
                name: unitTokens[0],
                gender: unitTokens[1],
                zodiac: unitTokens[2],
                brave: unitTokens[3],
                faith: unitTokens[4],
                class: unitTokens[5],
                activeSkill: unitTokens[6],
                reactSkill: unitTokens[7],
                supportSkill: unitTokens[8],
                moveSkill: unitTokens[9],
                mainAbilities: !monster ? mainAbilities : [],
                subAbilities: !monster ? subAbilities : [],
                gear,
                raw: unitTokens.join(" - "),
            };
        });
    return units;
};
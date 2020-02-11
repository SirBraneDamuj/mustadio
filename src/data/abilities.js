const client = require('../client/fftbg');

const abilities = {};

const abilityTypesFromFile = ['Reaction', 'Support', 'Movement'];
const fileAbilityTypeMapping = {
    'Reaction': 'react',
    'Support': 'support',
    'Movement': 'move',
};

const loadAbilitiesFromDumpFile = async (force) => {
    if (!force && Object.keys(abilities).length > 0) {
        return abilities;
    }
    const { data } = await client.abilityInfo();
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    data.split(delimiter).forEach((itemLine) => {
        const firstColon = itemLine.indexOf(':');
        const name = itemLine.slice(0, firstColon);
        const info = itemLine.slice(firstColon + 2);
        const abilityType = abilityTypesFromFile.find((type) => info.startsWith(`${type}. `));
        const realAbilityType = fileAbilityTypeMapping[abilityType] || 'active';
        abilities[name] = { 
            name, 
            info,
            type: realAbilityType,
        };
    });
    return abilities;
}

module.exports.getAbilities = async () => loadAbilitiesFromDumpFile(false);
module.exports.getAbility = async (abilityName) => (await loadAbilitiesFromDumpFile(false))[abilityName];
module.exports.forceReload = async () => loadAbilitiesFromDumpFile(true);
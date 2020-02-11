const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');

const abilityTypesFromFile = ['Reaction', 'Support', 'Movement'];
const fileAbilityTypeMapping = {
    'Reaction': 'react',
    'Support': 'support',
    'Movement': 'move',
};

const parseAbilityLine = (data, abilityLine) => {
    const firstColon = abilityLine.indexOf(':');
    const name = abilityLine.slice(0, firstColon);
    const info = abilityLine.slice(firstColon + 2);
    const abilityType = abilityTypesFromFile.find((type) => info.startsWith(`${type}. `));
    const realAbilityType = fileAbilityTypeMapping[abilityType] || 'active';
    data[name] = { 
        name, 
        info,
        type: realAbilityType,
    };
}

const myLoader = new DumpLoader(async () => client.abilityInfo(), parseAbilityLine);

module.exports.getAbilities = () => myLoader.getData();
module.exports.getAbility = (abilityName) => myLoader.getData()[abilityName];
module.exports.reload = async (version) => myLoader.reload(version);
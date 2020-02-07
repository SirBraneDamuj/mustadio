const client = require('../client/fftbg');

const abilities = {};

const ONE_HOUR = 1000 * 10;

const reloadAbilities = () => setTimeout(() => {
    loadAbilitiesFromDumpFile(true);
    setTimeout(reloadAbilities, ONE_HOUR);
}, ONE_HOUR);

reloadAbilities();

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
        abilities[name] = { 
            name, 
            info,
        };
    });
    return abilities;
}

module.exports.getAbilities = async () => loadAbilitiesFromDumpFile(false);
module.exports.getAbility = async (abilityName) => (await loadAbilitiesFromDumpFile(false))[abilityName];
const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');

const parseZodiacLine = (data, zodiacLine) => {
    const [name, info] = zodiacLine.split(' compatibility: ');
    data[name.toLowerCase()] = {
        name,
        info
    };
};

const myLoader = new DumpLoader(async () => client.zodiacInfo(), parseZodiacLine);

module.exports.getZodiacs = () => myLoader.getData();
module.exports.getZodiac = (zodiac) => myLoader.getData()[zodiac];
module.exports.reload = async (version) => myLoader.reload(version);
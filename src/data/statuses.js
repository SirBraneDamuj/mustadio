const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');

const parseStatusLine = (statuses, statusLine) => {
    const firstColon = statusLine.indexOf(':');
    const name = statusLine.slice(0, firstColon);
    const info = statusLine.slice(firstColon + 2);
    statuses[name] = { 
        name, 
        info,
    };
}

const myLoader = new DumpLoader(client.statusInfo, parseStatusLine);

module.exports.getStatuses = () => myLoader.getData();
module.exports.getStatus = (statusName) => myLoader.getData()[statusName];
module.exports.reload = async (version) => myLoader.reload(version);
const client = require('../client/fftbg');

const statuses = {};

const loadStatusesFromDumpFile = async (force) => {
    if (!force && Object.keys(statuses).length > 0) {
        return statuses;
    }
    const { data } = await client.statusInfo();
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    data.split(delimiter).forEach((statusLine) => {
        const firstColon = statusLine.indexOf(':');
        const name = statusLine.slice(0, firstColon);
        const info = statusLine.slice(firstColon + 2);
        statuses[name] = { 
            name, 
            info,
        };
    });
    return statuses;
}

module.exports.getStatuses = async () => loadStatusesFromDumpFile(false);
module.exports.getStatus = async (statusName) => (await loadStatusesFromDumpFile(false))[statusName];
module.exports.forceReload = async () => loadStatusesFromDumpFile(true);
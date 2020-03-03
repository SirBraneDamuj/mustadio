const client = require('../client/fftbg');

const mapRegex = /^(?<mapNumber>\d+)\) (?<mapTitle>.*)$/;

module.exports.getMaps = async (tournamentId) => {
    const { data } = await client.tournamentMaps(tournamentId);
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    return data.split(delimiter).reduce((maps, mapLine) => {
        const regexResult = mapRegex.exec(mapLine);
        if (regexResult) {
            const { mapNumber, mapTitle } = regexResult.groups;
            maps.push({
                number: mapNumber,
                title: mapTitle,
            });
        }
        return maps;
    }, []);
}
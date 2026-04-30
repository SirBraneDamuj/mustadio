import { fftbgClient } from '../clients/fftbg/index.js';
import type { ParsedMap } from '../types/game-data.js';

const mapRegex = /^(?<mapNumber>\d+)\) (?<mapTitle>.*)$/;

export async function getMaps(tournamentId: string): Promise<ParsedMap[]> {
  const { data } = await fftbgClient.tournamentMaps(tournamentId);

  let delimiter = '\r\n';
  if (!data.includes(delimiter)) {
    delimiter = '\n';
  }

  return data.split(delimiter).reduce((maps: ParsedMap[], mapLine) => {
    const regexResult = mapRegex.exec(mapLine);
    if (regexResult?.groups) {
      const { mapNumber, mapTitle } = regexResult.groups;
      if (mapNumber && mapTitle) {
        maps.push({
          number: mapNumber,
          title: mapTitle,
        });
      }
    }
    return maps;
  }, []);
}

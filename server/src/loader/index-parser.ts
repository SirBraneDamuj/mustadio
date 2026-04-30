import { JSDOM } from 'jsdom';

export interface DumpFile {
  name: string;
  timestamp: string;
}

export interface IndexData {
  dumpFiles: DumpFile[];
  latestTournament: string;
}

export function parseIndex(html: string): IndexData {
  const { window } = new JSDOM(html);
  const { document } = window;

  let latestTournament = '';
  const dumpFiles: DumpFile[] = [];

  const linkNodes = document.querySelectorAll('tr > td > a');
  for (const node of linkNodes) {
    const href = node.getAttribute('href');
    if (!href) continue;

    if (href.startsWith('tournament_')) {
      if (href > latestTournament) {
        latestTournament = href;
      }
    } else if (href.endsWith('.txt')) {
      const timestampNode = node.parentNode?.nextSibling;
      const timestamp = timestampNode?.textContent?.trim() ?? '';
      dumpFiles.push({
        name: href,
        timestamp,
      });
    }
  }

  return {
    dumpFiles,
    latestTournament: latestTournament.slice(0, -1), // Remove trailing slash
  };
}

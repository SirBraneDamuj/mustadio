export * from './constants.js';
export * as items from './items.js';
export * as abilities from './abilities.js';
export * as classes from './classes.js';
export * as statuses from './statuses.js';
export * as zodiacs from './zodiacs.js';
export * as monsterSkills from './monster-skills.js';
export * as stats from './stats.js';
export * as matchups from './matchups.js';

import * as items from './items.js';
import * as abilities from './abilities.js';
import * as classes from './classes.js';
import * as statuses from './statuses.js';
import * as zodiacs from './zodiacs.js';
import * as monsterSkills from './monster-skills.js';

export async function reloadAllGameData(version: string): Promise<void> {
  await Promise.all([
    items.reload(version),
    abilities.reload(version),
    classes.reload(version),
    statuses.reload(version),
    zodiacs.reload(version),
    monsterSkills.reload(version),
  ]);
}

import type { ClassBaseStats, Item, TotalStats } from '../types/game-data.js';

const baseStats: TotalStats = {
  cEvPercent: 0,
  sPhysEvPercent: 0,
  sMagEvPercent: 0,
  aPhysEvPercent: 0,
  aMagEvPercent: 0,
  hp: 0,
  mp: 0,
  speed: 0,
  move: 0,
  jump: 0,
  pa: 0,
  ma: 0,
  initialStatuses: [],
  permStatuses: [],
};

export function totalStatsForClassAndEquipment(
  classStats: ClassBaseStats,
  items: Item[],
  movementAbility: string | null | undefined
): TotalStats {
  const totalStats: TotalStats = {
    ...baseStats,
    initialStatuses: [],
    permStatuses: [],
  };

  for (const item of items) {
    const itemStats = item.stats;

    if (item.type === 'Shield') {
      totalStats.sPhysEvPercent += itemStats.physEvadePercent;
      totalStats.sMagEvPercent += itemStats.magicEvadePercent;
    } else if (item.type === 'Accessory') {
      totalStats.aPhysEvPercent += itemStats.physEvadePercent;
      totalStats.aMagEvPercent += itemStats.magicEvadePercent;
    }

    for (const [stat, value] of Object.entries(itemStats)) {
      if (stat === 'initialStatuses' || stat === 'permStatuses') {
        if (Array.isArray(value)) {
          totalStats[stat] = totalStats[stat].concat(value);
        }
      } else if (
        !stat.toLowerCase().includes('evade') &&
        stat !== 'range' &&
        !stat.toLowerCase().includes('wp') &&
        stat !== 'element'
      ) {
        const numValue = typeof value === 'number' ? value : 0;
        const currentValue = totalStats[stat as keyof TotalStats];
        if (typeof currentValue === 'number') {
          (totalStats[stat as keyof TotalStats] as number) = currentValue + numValue;
        }
      }
    }
  }

  for (const [stat, value] of Object.entries(classStats)) {
    if (stat === 'cEvPercent') {
      totalStats.cEvPercent = value;
    } else {
      const currentValue = totalStats[stat as keyof TotalStats];
      if (typeof currentValue === 'number' && typeof value === 'number') {
        (totalStats[stat as keyof TotalStats] as number) = currentValue + value;
      }
    }
  }

  if (movementAbility) {
    if (movementAbility.startsWith('Move+')) {
      totalStats.move += parseInt(movementAbility.slice(-1), 10);
    }
    if (movementAbility.startsWith('Jump+')) {
      totalStats.jump += parseInt(movementAbility.slice(-1), 10);
    }
  }

  return totalStats;
}

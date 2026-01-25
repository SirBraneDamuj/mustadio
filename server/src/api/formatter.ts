import { getClasses, getClass } from '../game-data/classes.js';
import { getAbility, mainActiveForClass } from '../game-data/abilities.js';
import { getItem, getItems } from '../game-data/items.js';
import { getStatus } from '../game-data/statuses.js';
import type { Item, ClassGender, Ability, Status, Gender } from '../types/game-data.js';
import type {
  ApiUnit,
  ApiTeam,
  ApiTournament,
  ApiClassGender,
  ApiUnitAbilities,
  ApiAbility,
  ApiItem,
  ApiActiveAbility,
} from '../types/api.js';

function isEmptyArray(it: unknown): it is [] {
  return Array.isArray(it) && it.length === 0;
}

function pickNonEmpty<T extends object>(obj: T, keys: (keyof T)[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== 0 && !isEmptyArray(value)) {
      result[key] = value;
    }
  }
  return result;
}

interface UnitRecord {
  name: string;
  gender: string;
  zodiac: string;
  brave: string;
  faith: string;
  className: string;
  subSkill: string | null;
  reactSkill: string | null;
  supportSkill: string | null;
  moveSkill: string | null;
  abilities: { name: string; mainOrSub: string }[];
  equipment: { name: string }[];
}

interface TeamRecord {
  name: string;
  units: UnitRecord[];
}

interface TournamentRecord {
  id: string;
  teams: TeamRecord[];
}

export class ApiFormatter {
  private showInfo: boolean;
  private showStats: boolean;

  constructor(showInfo: boolean, showStats: boolean) {
    this.showInfo = showInfo;
    this.showStats = showStats;
  }

  formatTournament(tournament: { id: string; teams: (TeamRecord | null)[] }): ApiTournament {
    return {
      id: tournament.id,
      teams: tournament.teams
        .filter((team): team is TeamRecord => team !== null)
        .map((team) => this.formatTeamForApiResponse(tournament.id, team)),
    };
  }

  formatClassGenderForApiResponse(clazz: ClassGender): ApiClassGender {
    if (this.showStats) {
      const innates = clazz.innates
        .map((innate) => {
          if (innate === 'Jump') return null;
          return getAbility(innate) ?? getStatus(innate) ?? null;
        })
        .filter((it): it is Ability | Status => it !== null);

      return {
        name: clazz.name,
        gender: clazz.gender,
        ...(innates.length > 0 ? { innates } : {}),
        ...(this.showStats ? { baseStats: clazz.baseStats } : {}),
        ...(this.showInfo ? { raw: clazz.raw } : {}),
      };
    }

    return {
      name: clazz.name,
      gender: clazz.gender,
      ...(this.showInfo ? { raw: clazz.raw } : {}),
    };
  }

  formatUnitClassForApiResponse(className: string, gender: string): ApiClassGender {
    const realClassName = (className.includes('Calculator') ? 'Calculator' : className).replace(' ', '');
    const clazz = getClass(realClassName, gender as Gender);
    if (!clazz) {
      return { name: className, gender };
    }
    return this.formatClassGenderForApiResponse(clazz);
  }

  formatUnitActiveAbilityForApiResponse(
    abilityName: string | null,
    learned: { name: string }[]
  ): ApiActiveAbility {
    return {
      name: abilityName ?? '',
      learned: learned.map((learnedAbility) => {
        const ability = getAbility(learnedAbility.name);
        return {
          name: learnedAbility.name,
          ...(this.showInfo && ability ? { info: ability.info } : {}),
        };
      }),
    };
  }

  formatAbilityForApiResponse(ability: Ability): ApiAbility {
    return {
      name: ability.name,
      ...(this.showInfo ? { info: ability.info, type: ability.type } : {}),
    };
  }

  formatUnitNonActiveAbilityForApiResponse(abilityName: string | null): ApiAbility {
    if (!abilityName) {
      return { name: '' };
    }
    const ability = getAbility(abilityName) ?? { name: abilityName, info: '', type: 'active' as const };
    return this.formatAbilityForApiResponse(ability);
  }

  formatUnitAbilitiesForApiResponse(unit: UnitRecord): ApiUnitAbilities {
    return {
      mainActive: this.formatUnitActiveAbilityForApiResponse(
        mainActiveForClass(unit.className),
        unit.abilities.filter((a) => a.mainOrSub === 'main')
      ),
      subActive: this.formatUnitActiveAbilityForApiResponse(
        unit.subSkill,
        unit.abilities.filter((a) => a.mainOrSub === 'sub')
      ),
      react: this.formatUnitNonActiveAbilityForApiResponse(unit.reactSkill),
      support: this.formatUnitNonActiveAbilityForApiResponse(unit.supportSkill),
      move: this.formatUnitNonActiveAbilityForApiResponse(unit.moveSkill),
    };
  }

  formatItemForApiResponse(item: Item): ApiItem {
    const initialStatuses = item.stats.initialStatuses.map((status) => getStatus(status));
    const permStatuses = item.stats.permStatuses.map((status) => getStatus(status));

    if (this.showStats) {
      const stats: Partial<Item['stats']> = pickNonEmpty(item.stats, [
        'wp', 'healWp', 'absorbWp', 'range', 'evadePercent', 'physEvadePercent',
        'magicEvadePercent', 'hp', 'mp', 'element', 'speed', 'move', 'jump', 'pa', 'ma',
      ]);

      if (initialStatuses.some((s) => s !== undefined)) {
        (stats as Record<string, unknown>).initialStatuses = initialStatuses.filter(Boolean);
      }
      if (permStatuses.some((s) => s !== undefined)) {
        (stats as Record<string, unknown>).permStatuses = permStatuses.filter(Boolean);
      }

      return {
        name: item.name,
        ...(this.showInfo ? { info: item.info, type: item.type, slot: item.slot } : {}),
        stats,
      };
    }

    return {
      name: item.name,
      ...(this.showInfo ? { info: item.info, type: item.type, slot: item.slot } : {}),
    };
  }

  formatUnitEquipmentForApiResponse(equipments: { name: string }[]): ApiItem[] {
    return equipments
      .map((equipment) => {
        const item = getItem(equipment.name);
        if (!item) return null;
        return this.formatItemForApiResponse(item);
      })
      .filter((i): i is ApiItem => i !== null);
  }

  formatUnitForApiResponse(tournamentId: string, teamName: string, unit: UnitRecord): ApiUnit {
    return {
      name: unit.name,
      gender: unit.gender,
      zodiac: unit.zodiac,
      brave: unit.brave,
      faith: unit.faith,
      tournamentId,
      teamName,
      class: this.formatUnitClassForApiResponse(unit.className, unit.gender),
      abilities: unit.gender === 'Monster' ? {} : this.formatUnitAbilitiesForApiResponse(unit),
      equipment: unit.gender === 'Monster' ? [] : this.formatUnitEquipmentForApiResponse(unit.equipment),
    };
  }

  formatTeamForApiResponse(tournamentId: string, team: TeamRecord): ApiTeam {
    return {
      tournamentId,
      teamName: team.name,
      units: team.units.map((unit) => this.formatUnitForApiResponse(tournamentId, team.name, unit)),
    };
  }
}

export function createFormatter(query: { include?: string | string[] }): ApiFormatter {
  const include = Array.isArray(query.include) ? query.include.join(',') : String(query.include ?? '');
  return new ApiFormatter(include.includes('info'), include.includes('stats'));
}

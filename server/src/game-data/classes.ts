import { DumpLoader } from './dump-loader.js';
import { fftbgClient } from '../clients/fftbg/index.js';
import type { ClassData, ClassGender, ClassBaseStats, Gender } from '../types/game-data.js';

const classAndGenderRegex = /^(?:(?<className>[A-Z]\w+)|(?<floatingEye>Floating Eye)) ?(?<gender>Male|Female)?'s/;

function classAndGenderForLine(line: string): { className: string; gender: Gender } {
  const match = classAndGenderRegex.exec(line);
  if (!match?.groups) {
    throw new Error(`Could not parse class line: ${line}`);
  }
  const { className, gender, floatingEye } = match.groups;
  return {
    className: floatingEye ?? className ?? 'Unknown',
    gender: (gender as Gender) ?? 'Monster',
  };
}

const baseStatsRegex =
  /: (?<hp>\d+) HP, (?<mp>\d+) MP, (?<move>\d+) Move, (?<jump>\d+) Jump, (?<speed>\d+) Speed, (?<pa>\d+) PA, (?<ma>\d+) MA, (?<cEvPercent>\d+)% C-EV./;

function baseStatsForLine(line: string): ClassBaseStats {
  const match = baseStatsRegex.exec(line);
  if (!match?.groups) {
    throw new Error(`Could not parse base stats: ${line}`);
  }
  return {
    hp: parseInt(match.groups.hp ?? '0', 10),
    mp: parseInt(match.groups.mp ?? '0', 10),
    move: parseInt(match.groups.move ?? '0', 10),
    jump: parseInt(match.groups.jump ?? '0', 10),
    speed: parseInt(match.groups.speed ?? '0', 10),
    pa: parseInt(match.groups.pa ?? '0', 10),
    ma: parseInt(match.groups.ma ?? '0', 10),
    cEvPercent: parseInt(match.groups.cEvPercent ?? '0', 10),
  };
}

const innatesRegex = /Innate: (?<innatesString>[A-Z].+)\. .*$/;

function innatesForLine(line: string): string[] {
  const match = innatesRegex.exec(line);
  if (!match?.groups?.innatesString) {
    return [];
  }
  return match.groups.innatesString.split(', ');
}

function parseClassLine(classes: Record<string, ClassData>, classLine: string): void {
  const { className, gender } = classAndGenderForLine(classLine);
  const baseStats = baseStatsForLine(classLine);
  const innates = innatesForLine(classLine);

  const classGender: ClassGender = {
    name: className,
    gender,
    baseStats,
    innates,
    raw: classLine,
  };

  if (!classes[className]) {
    classes[className] = {};
  }
  classes[className][gender] = classGender;
}

const classLoader = new DumpLoader<ClassData>(() => fftbgClient.classInfo(), parseClassLine);

export function getClasses(): Record<string, ClassData> {
  return classLoader.getData();
}

export function getClass(className: string, gender: Gender): ClassGender | undefined {
  const classData = classLoader.getData()[className];
  return classData?.[gender];
}

export async function reload(version: string): Promise<void> {
  await classLoader.reload(version);
}

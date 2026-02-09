import { Hono } from 'hono';
import { createFormatter, ApiFormatter } from '../formatter.js';
import { getItems } from '../../game-data/items.js';
import { getAbilities } from '../../game-data/abilities.js';
import { getClasses } from '../../game-data/classes.js';
import { getStatuses } from '../../game-data/statuses.js';
import { getAllMonsterSkills } from '../../game-data/monster-skills.js';
import { GENDERS } from '../../game-data/constants.js';
import type { Gender } from '../../types/game-data.js';

const dataRoutes = new Hono();

dataRoutes.get('/items', (c) => {
  const formatter = createFormatter(c.req.query());
  const items = getItems();
  return c.json({
    items: Object.values(items).map((item) => formatter.formatItemForApiResponse(item)),
  });
});

dataRoutes.get('/abilities', (c) => {
  const formatter = createFormatter(c.req.query());
  const abilities = getAbilities();
  return c.json({
    abilities: Object.values(abilities).map((ability) => formatter.formatAbilityForApiResponse(ability)),
  });
});

dataRoutes.get('/classes', (c) => {
  const formatter = createFormatter(c.req.query());
  const classes = getClasses();
  return c.json({
    classes: Object.values(classes).flatMap((clazz) => {
      return GENDERS.reduce((genderClasses: ReturnType<ApiFormatter['formatClassGenderForApiResponse']>[], gender: Gender) => {
        const classGender = clazz[gender];
        if (classGender) {
          genderClasses.push(formatter.formatClassGenderForApiResponse(classGender));
        }
        return genderClasses;
      }, []);
    }),
  });
});

dataRoutes.get('/data', (c) => {
  const formatter = new ApiFormatter(true, true);
  const items = getItems();
  const abilities = getAbilities();
  const classes = getClasses();
  const statuses = getStatuses();
  const monsterSkills = getAllMonsterSkills();

  return c.json({
    items: Object.fromEntries(
      Object.entries(items).map(([itemName, item]) => [
        itemName,
        formatter.formatItemForApiResponse(item),
      ])
    ),
    abilities: Object.fromEntries(
      Object.entries(abilities).map(([abilityName, ability]) => [
        abilityName,
        formatter.formatAbilityForApiResponse(ability),
      ])
    ),
    classes: Object.fromEntries(
      Object.entries(classes).map(([className, genders]) => [
        className,
        Object.fromEntries(
          Object.entries(genders).map(([gender, clazz]) => [
            gender,
            formatter.formatClassGenderForApiResponse(clazz),
          ])
        ),
      ])
    ),
    statuses,
    monsterSkills: Object.fromEntries(
      Object.entries(monsterSkills).map(([monsterName, skills]) => [
        monsterName.replace(/ /g, ''),
        skills,
      ])
    ),
  });
});

export { dataRoutes };

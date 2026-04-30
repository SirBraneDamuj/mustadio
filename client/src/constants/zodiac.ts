type Compatibility = 'minmax' | 'good' | 'bad';
type Gender = 'Male' | 'Female' | 'Monster';

const MINMAX: Compatibility = 'minmax';
const GOOD: Compatibility = 'good';
const BAD: Compatibility = 'bad';

const CAPRICORN = 'Capricorn';
const AQUARIUS = 'Aquarius';
const PISCES = 'Pisces';
const ARIES = 'Aries';
const TAURUS = 'Taurus';
const GEMINI = 'Gemini';
const CANCER = 'Cancer';
const LEO = 'Leo';
const VIRGO = 'Virgo';
const LIBRA = 'Libra';
const SCORPIO = 'Scorpio';
const SAGITTARIUS = 'Sagittarius';
const SERPENTARIUS = 'Serpentarius';

type ZodiacSign = typeof CAPRICORN | typeof AQUARIUS | typeof PISCES | typeof ARIES | typeof TAURUS |
    typeof GEMINI | typeof CANCER | typeof LEO | typeof VIRGO | typeof LIBRA |
    typeof SCORPIO | typeof SAGITTARIUS | typeof SERPENTARIUS;

type ZodiacMapping = Record<string, Record<string, Compatibility>>;

export const zodiacMapping: ZodiacMapping = {
    [CAPRICORN]: {
        [CANCER]: MINMAX,
        [TAURUS]: GOOD,
        [VIRGO]: GOOD,
        [LIBRA]: BAD,
        [ARIES]: BAD,
    },
    [AQUARIUS]: {
        [LEO]: MINMAX,
        [GEMINI]: GOOD,
        [LIBRA]: GOOD,
        [TAURUS]: BAD,
        [SCORPIO]: BAD,
    },
    [PISCES]: {
        [VIRGO]: MINMAX,
        [CANCER]: GOOD,
        [SCORPIO]: GOOD,
        [SAGITTARIUS]: BAD,
        [GEMINI]: BAD,
    },
    [ARIES]: {
        [LIBRA]: MINMAX,
        [SAGITTARIUS]: GOOD,
        [LEO]: GOOD,
        [CANCER]: BAD,
        [CAPRICORN]: BAD,
    },
    [TAURUS]: {
        [SCORPIO]: MINMAX,
        [VIRGO]: GOOD,
        [CAPRICORN]: GOOD,
        [LEO]: BAD,
        [AQUARIUS]: BAD,
    },
    [GEMINI]: {
        [SAGITTARIUS]: MINMAX,
        [LIBRA]: GOOD,
        [AQUARIUS]: GOOD,
        [VIRGO]: BAD,
        [PISCES]: BAD,
    },
    [CANCER]: {
        [CAPRICORN]: MINMAX,
        [SCORPIO]: GOOD,
        [PISCES]: GOOD,
        [LIBRA]: BAD,
        [ARIES]: BAD,
    },
    [LEO]: {
        [AQUARIUS]: MINMAX,
        [SAGITTARIUS]: GOOD,
        [ARIES]: GOOD,
        [SCORPIO]: BAD,
        [TAURUS]: BAD,
    },
    [VIRGO]: {
        [PISCES]: MINMAX,
        [CAPRICORN]: GOOD,
        [TAURUS]: GOOD,
        [SAGITTARIUS]: BAD,
        [GEMINI]: BAD,
    },
    [LIBRA]: {
        [ARIES]: MINMAX,
        [AQUARIUS]: GOOD,
        [GEMINI]: GOOD,
        [CAPRICORN]: BAD,
        [CANCER]: BAD,
    },
    [SCORPIO]: {
        [TAURUS]: MINMAX,
        [PISCES]: GOOD,
        [CANCER]: GOOD,
        [AQUARIUS]: BAD,
        [LEO]: BAD,
    },
    [SAGITTARIUS]: {
        [GEMINI]: MINMAX,
        [ARIES]: GOOD,
        [LEO]: GOOD,
        [PISCES]: BAD,
        [VIRGO]: BAD,
    },
    [SERPENTARIUS]: {},
};

export function compareZodiac(z1: string, gender1: Gender, z2: string, gender2: Gender): number {
    const compat = zodiacMapping[z1]?.[z2];
    if (compat !== zodiacMapping[z2]?.[z1]) {
        throw new Error(`zodiac compatibility issue: ${z1} ${z2}`);
    }
    if (!compat) {
        return 3;
    } else if (compat === MINMAX) {
        if (gender1 === 'Monster' || gender2 === 'Monster') {
            return 2;
        } else if (gender1 === gender2) {
            return 1;
        } else {
            return 5;
        }
    } else if (compat === GOOD) {
        return 4;
    } else if (compat === BAD) {
        return 2;
    } else {
        throw new Error(`zodiac compatibility issue: ${z1} ${z2} ${gender1} ${gender2}`);
    }
}

export const zodiacInfo = (word: string): string => `Zodiac compatibility with ${word}. 1 = worst, 2 = bad, 3 = neutral, 4 = good, 5 = best`;

const client = require('../client/fftbg');
const mapValues = require('lodash/mapValues');

const classes = {};

const classAndGenderRegex = /^(?:(?<className>[A-Z]\w+)|(?<floatingEye>Floating Eye)) ?(?<gender>Male|Female)?'s/
const classAndGenderForLine = (line) => {
    console.log(line);
    const {
        className,
        gender,
        floatingEye,
    } = classAndGenderRegex.exec(line).groups;
    return {
        className: floatingEye || className,
        gender: gender || 'Monster',
    };
};

const baseStatsRegex = /: (?<hp>\d+) HP, (?<mp>\d+) MP, (?<move>\d+) Move, (?<jump>\d+) Jump, (?<speed>\d+) Speed, (?<pa>\d+) PA, (?<ma>\d+) MA, (?<cEvPercent>\d+)% C-EV./
const baseStatsForLine = (line) => mapValues({ ...baseStatsRegex.exec(line).groups }, (val) => parseInt(val, 10));

const innatesRegex = /Innates: (?<innatesString>[A-Z].+)\. .*$/
const innatesForLine = (line) => {
    const { innatesString } = innatesRegex.exec(line).groups;
    return innatesString.split(', ');
}

const loadClassesFromDumpFile = async (force) => {
    if (!force && Object.keys(classes).length > 0) {
        return classes;
    }
    const { data } = await client.classInfo();
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    data.split(delimiter).forEach((classLine) => {
        const { className, gender } = classAndGenderForLine(classLine)
        const baseStats = baseStatsForLine(classLine);
        const innates = innatesForLine(classLine);
        classes[className] = { 
            ...classes[className],
            [gender]: {
                name: className,
                gender,
                baseStats,
                innates,
                raw: classLine,
            },
        };
    });
    return classes;
}

module.exports.getClasses = async () => loadClassesFromDumpFile(false);
module.exports.getClass = async (className, gender) => (await loadClassesFromDumpFile(false))[className][gender];
module.exports.setAutoReload = (duration) => setInterval(() => loadClassesFromDumpFile(true), duration);
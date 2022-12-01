const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');
const mapValues = require('lodash/mapValues');

const classAndGenderRegex = /^(?:(?<className>[A-Z]\w+)|(?<floatingEye>Floating Eye)) ?(?<gender>Male|Female)?'s/
const classAndGenderForLine = (line) => {
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

const innatesRegex = /Innate: (?<innatesString>[A-Z].+)\. .*$/
const innatesForLine = (line) => {
    const { innatesString } = innatesRegex.exec(line).groups;
    return innatesString.split(', ');
}

const parseClassLine = (classes, classLine) => {
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
}

const myLoader = new DumpLoader(client.classInfo, parseClassLine);

module.exports.getClasses = () => myLoader.getData();
module.exports.getClass = (className, gender) => myLoader.getData()[className][gender];
module.exports.reload = async (version) => myLoader.reload(version);

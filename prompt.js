const readline = require("readline");
const data = require('./data');
const loader = require('./loader');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("FFTBAT>");

rl.on("line", (input) => {
    if (input.startsWith("team")) {
        const tokens = input.split(" ");
        if (tokens.length !== 2) {
            console.log("bad command");
            rl.prompt();
            return;
        }
        console.log(data.unitsForTeam(tokens[1]));
        rl.prompt();
    }
    else if (input.startsWith("match")) {
        const tokens = input.split(" ");
        if (tokens.length !== 3) {
            console.log("bad command");
            rl.prompt();
            return;
        }
        const team1 = data.unitsForTeam(tokens[1]);
        const team2 = data.unitsForTeam(tokens[2]);
        console.log(team1);
        console.log(team2);
        rl.prompt();
    }
    else if (input.startsWith("new")) {
        data.reinitialize();
        rl.prompt();
    }
    else if (input.startsWith("load ")) {
        const tokens = input.split(" ");
        if (tokens.length != 2) {
            console.log("bad command");
            rl.prompt();
            return;
        }
        const teamName = tokens[1];
        loader.loadTeam(teamName).then(() => rl.prompt());
    }
    else if (input.startsWith("loadall")) {
        data.teamNames.reduce(
            (chain, teamName) => chain
                .then(() => loader.loadTeam(teamName))
                .then(() => new Promise((resolve) => setTimeout(resolve, 4000))),
            Promise.resolve(),
        ).then(() => rl.prompt());
    }
    else if (input.startsWith("save")) {
        data.save();
        rl.prompt();
    }
    else if (input.startsWith("exit")) {
        rl.close();
    } else if (input.startsWith("current")) {
        console.log(data.currentMatch());
        rl.prompt();
    } else {
        console.log("what?");
        rl.prompt();
    }
});

rl.on("close", () => {
    console.log("see ya fella");
    data.save();
    process.exit(0);
});

module.exports = rl;
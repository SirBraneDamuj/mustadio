const readline = require("readline");
const data = require('./data');
const loader = require('./loader');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("FFTBAT>");

rl.on("line", async (input) => {
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
        await data.reinitialize();
        rl.prompt();
    }
    else if (input.startsWith("exit")) {
        rl.close();
    }
    else {
        console.log("what?");
        rl.prompt();
    }
});

rl.on("close", () => {
    console.log("see ya fella");
    process.exit(0);
});

module.exports = rl;
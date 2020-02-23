# Mustadio
An unofficial companion app for twitch.tv/fftbattleground

![a screenshot](https://i.imgur.com/1KW6llH.png)

## Background

[FFTBattleground](https://twitch.tv/fftbattleground) is a twitch channel that runs live AI tournaments using a modded version of the beloved Playstation game Final Fantasy Tactics. Viewers can bet fake money on the outcome of matches.

The teams that fight each other are composed of four units, each one being a viewer's twitch name assigned to a random class with random gear and random skills. Keeping track of all of that information to make informed bets can be challenging.

The maintainer of the stream graciously provides a data dump of the tournament that can be leveraged by applications like this one.

## How to run

### Environment Variables

* `FFTBG_BASE_URL` is the base URL of the file server that hosts the data dumps. I am not sharing this publicly but it can be found.
* `FFTBG_DATA_STRATEGY` determines whether to load live data from the FFTBG dump server or use the fake data that I include in source. It defaults to fake data. Set this variable to `real` to load the real data.

### Running

`npm start` should start the server. Don't forget to `npm install` too.

Once started, visit http://localhost:3000. 

### Using

The default route will load the current tournament if it isn't loaded yet and redirect you to `/red/blue`. Use the match buttons at the bottom to navigate to a matchup of your choosing. The match buttons only enumerate possible matchups that can occur in the tournament. You can type any two team names in the URL to show a left/right matchup how you choose. If you want to see an arbitrary matchup, type the two team names in the URL 

Once a tournament is over, someone has to click the New Tournament button in the menu bar. That will load the newest tournament ID and take you to the first matchup.
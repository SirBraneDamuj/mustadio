# Mustadio
An unofficial companion app for twitch.tv/fftbattleground

![a screenshot](https://imgur.com/0BE7V4g.png)

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

Click the "Latest Match" button to view the currently live matchup. There may be about a 10 second delay between matches.

If you want to view a prior tournament, just visit that tournament's route (`/${tournamentId}`). Use the Choose Matchup button to inspect specific matchups, or just add the two teams to compare to the URL (`/${tournamentId}/${team1}/${team2}`).

Take a look at the API docs! They don't get nearly as much TLC as the web but there's still a ton of data there!

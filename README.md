# Mustadio
An unofficial companion app for twitch.tv/fftbattleground

![a screenshot](https://i.imgur.com/1KW6llH.png)

## Background

[FFTBattleground](https://twitch.tv/fftbattleground) is a twitch channel that runs live AI tournaments using a modded version of the beloved Playstation game Final Fantasy Tactics. Viewers can bet fake money on the outcome of matches.

The teams that fight each other are composed of four units, each one being a viewer's twitch name assigned to a random class with random gear and random skills. Keeping track of all of that information to make informed bets can be challenging.

The maintainer of the stream graciously provides a data dump of the tournament that can be leveraged by applications like this one.

## How to run

### Environment Variables

* `TWITCH_USERNAME` should be _YOUR_ twitch username.
* `TWITCH_AUTH_TOKEN` should be an auth token generated from [here](https://twitchapps.com/tmi/). You can also just use your regular password I think? I would suggest just using a token though.
* `FFTBG_BASE_URL` is the base URL of the file server that hosts the data dumps. I am not sharing this publicly but it can be found.
* `MUSTADIO_CLI` is whether or not to run the CLI.

### Running

`npm start` should start the server. Don't forget to `npm install` too.

## How to use

There are two components to the companion app.

* The command line has some very basic commands. It is mainly there to quickly inspect the data that the app has. You can use it to trigger team loads if you're missing data. That's about it.
* The web view renders a rudimentary matchup page. The matchup shows two teams, their units, and the stats for their units. You can view a matchup by visiting `http://localhost:3000/team1/team2` once the server is running. It also has some quick bet buttons that will actually send a message, e.g., `!bet 500 purple`, to the twitch chat on your behalf. Make sure that you really do want to do that bet if you click on them, there is no confirmation.
* Another feature of the web view is to show the "current" matchup by just visiting `http://localhost:3000/`. This hasn't been tested or developed very much and is likely prone to bugs. It tries to detect the "Betting is now open" message.

## Code Summary

* `main.js` is the main entrypoint
* `prompt.js` is where the CLI is handled
* `server.js` is where the web server is defined
* `twitch.js` is stuff dealing with the twitch integration
* `data.js` is where the "persistence" (if you can even call it that...) happens
* `match.pug` is the main view of the web app. It is a very hastily assembled pug template. It's also my _first_ pug template, so please forgive any unusual things you see in it :)
* `public/app.js` is the javascript powering the front end. It's just a couple click handlers for now, nothing fancy.

I use bootstrap and jquery from cdns. I'm not planning on going too crazy with the front end. I like using templates for now.

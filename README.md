# fftbatcompanion
An unofficial companion app for twitch.tv/fftbattleground

## Background

[FFTBattleground](https://twitch.tv/fftbattleground) is a twitch channel that runs live AI tournaments using a modded version of the beloved Playstation game Final Fantasy Tactics. Viewers can bet fake money on the outcome of matches.

The teams that fight each other are composed of four units, each one being a viewer's twitch name assigned to a random class with random gear and random skills. Keeping track of all of that information to make informed bets can be challenging.

Viewers can interact with the bot via twitch chat. One of the commands allows inspecting a unit to see some limited stats, equipment, and skills. This companion app's main purpose is to parse those messages in order to present the data more readily to a viewer.

This is an app that I wrote in my spare time while sitting in a hotel room while traveling for work. It is very rudimentary, has very few guards in place, and has a limited scope of features. Use at your own risk.

## A note about spam

My hope when I started this app was that viewers would naturally inspect each unit, and I could parse the natural conversation to get all my info. Unfortunately, viewers do not do this for every unit. To accommodate this, I wrote one of the commands in this app, `load TEAM_NAME`. This command attempts to request info on each unit for the specified team. Another command, `loadall`, does this for _all nine teams_. The bot running the game has a limited throughput of messages, and the unit message is very large requiring an entire batch for itself. Please be mindful of this and try not to disrupt the stream while using it. My hope is that one day the bot can provide this information some other way or with less disruption to its normal behavior.

## How to run

### Environment Variables

* `TWITCH_USERNAME` should be _YOUR_ twitch username.
* `TWITCH_AUTH_TOKEN` should be an auth token generated from [here](https://twitchapps.com/tmi/). You can also just use your regular password I think? I would suggest just using a token though.

### Running

`npm start` should start the server. Don't forget to `npm install` too.

## How to use

There are two components to the companion app.

* The command line has some very basic commands. It is mainly there to quickly inspect the data that the app has. You can use it to trigger team loads if you're missing data. That's about it.
* The web view renders a rudimentary matchup page. The matchup shows two teams, their units, and the stats for their units. You can view a matchup by visiting `http://localhost:3000/team1/team2` once the server is running. It also has some quick bet buttons that will actually send a message, e.g., `!bet 500 purple`, to the twitch chat on your behalf. Make sure that you really do want to do that bet if you click on them, there is no confirmation.
* Another feature of the web view is to show the "current" matchup by just visiting `http://localhost:3000/`. This hasn't been tested or developed very much and is likely prone to bugs. It tries to detect the "Betting is now open" message.

## Code Summary

`bot.js` is the main entrypoint
`prompt.js` is where the CLI is handled
`server.js` is where the web server is defined
`twitch.js` is stuff dealing with the twitch integration
`data.js` is where the "persistence" (if you can even call it that...) happens
`loader.js` is a couple functions for loading team data manually
`match.pug` is the main view of the web app. It is a very hastily assembled pug template. It's also my _first_ pug template, so please forgive any unusual things you see in it :)
`public/app.js` is the javascript powering the front end. It's just a couple click handlers for now, nothing fancy.

I use bootstrap and jquery from cdns. I'm not planning on going too crazy with the front end. I like using templates for now.

## Plans/Todo

* Smarter loading. I'd like the app to recognize when it already has the data it needs and skip sending the message. Though viewers don't inspect _every_ unit, they do inspect many of them, and I could definitely cut down on the number of requests I send to the bot.
* API for the data. I'd like to run this centrally and provide the data via API instead of having each individual instance attempt to collect it from twitch chat
* Historical data. Right now the data is all stored in memory. I write it to files on quit because it was easier to develop that way (loading json instead of re-requesting all the data on launch) but storing teams and match outcomes more permanently is something I'd like to do. I'm not sure that the match outcome is actually logged to twitch chat anywhere though...



# Tweakers Time Machine

Chrome browser extension for the [Tweakers.net](https://tweakers.net) Dutch tech community website. Which adds an "On this day in..." section on the frontpage.
This section contains historical articles from the same day in other years.

Wouldn't exist without the work done by [ieperlingetje](https://tweaker.me/ieperlingetje) and his [Tijdmachine](https://randomize.be/wot_tijdmachine/) (Time Machine) website for its contents.

## Screenshot
![Screenshot](./screenshot.png)

## Installation
For now the extension is not available in the Chrome store. (So there are no automatic updates)

Download the latest release from [here](https://github.com/matthijn/tweakers-time-machine/releases/)

- Navigate to chrome://extensions
- Expand the Developer dropdown menu and click “Load Unpacked Extension”
- Navigate to the local folder containing the extension’s code and click Ok
- Assuming there are no errors, the extension should load into your browser

## Building for development
- `npm run build` generates a minified `content.js` file from the sources in the `./dist/` directory
- `npm run auto-build` runs the build command on file change

## Building for distribution
- Todo

## Suggestions / Bugs
For any suggestions and or bugs please open a new [issue](https://github.com/matthijn/topic-tattle/issues) or send me a [DM](https://gathering.tweakers.net/forum/pm_new_message).  
# What's Open In North Brooklyn Area During COVID-19?

A directory of essential businesses that are open in North Brooklyn area during COVID-19. 

## How to Contribute

- File an issue via this [repo's issues page](https://github.com/zhik/whats-open-north-brooklyn/issues).
- Request a feature via this [repo's issues page](https://github.com/zhik/whats-open-north-brooklyn/issues).
- Comment on issues.
- Write code to fix issues or to create new features. When contributing code, please be sure to:
  - Fork this repository, modify the code (changing only one thing at a time), and then issue a pull request for each change.
  - Follow the project's coding style (using K&R-style indentation and bracketing, commenting above each feature, and using snake case for variables).
  - Test your code locally before issuing a pull request.
  - Clearly state the purpose of your change in the description field for each commit.

## Architecture

This map shows business locations for North Brooklyn, from data hosted in [Airtable](https://airtable.com/shrRBozfbknHIlpIm).


This application is built using [Svelte](https://svelte.dev/), [Leaflet](https://leafletjs.com/), and [Carto.js](https://carto.com/developers/carto-js/).

Icons from [Maps Icons Collection](https://mapicons.mapsmarker.com).

## Setup

Download data
```bash
cd public
npm install 
npm run start
```
_Note: If you are running Download Data instruction on a dev machine, comment out the following line, otherwise you will run into, Error: Failed to launch the browser process! spawn /usr/bin/chromium-browser ENOENT_
```
async function updateFiles(directory) {
    ...
    executablePath: '/usr/bin/chromium-browser' // Comment this line out
    ...
}
```


Download the svelte app
```bash
cd ..
npm install
```

You can either build by running `npm run build` or run live development environment by running `npm run dev`, then opening [localhost:5000](http://localhost:5000/) in your browser.

## Copyrights

Please see [license](https://github.com/zhik/east-village-essential-small-business/blob/master/LICENSE) file for details.

- Non-code, Creative Commons Attribution 4.0
- Code, GNU General Public License

## Have Questions?
Email [Zhi Keng He](mainto:zhi@beta.nyc)
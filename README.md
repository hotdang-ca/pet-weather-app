# Pet Weather App
## Introduction
The Pet Weather App exists to answer this one simple question: Does my pet need an umbrella?
The app is a ReactJS front-end that relies on an ExpressJS Backend (found [here](https://github.com/hotdang-ca/pet-shelter-api) ).
Additionally, the app fetches weather information for pet coordinates from [DarkSky](https://darksky.net) (formally known as Forecast.IO).

## Getting Started
While most ReactJS apps can be built and deployed  with a simple  `npm run build`, and then deploy the build folder to your Apache/Nginx server, due to the CORS networking constraints of the DarkSky API, we had to route all the DarkSky API calls through a small proxy server embedded within the web app using the ExpressJS framework and Request API, contained inside of `server.js`.

Therefore, your deploy instructions are as follows:
1. Install your node dependencies with `npm install`
2. Set your DarkSky API key in `PetDetailsScreen.js`
3. Perform a production build with `npm run build`
4. Start the server with `node ./server.js`. The node server will present the webapp’s build directory for you.

## TODO
* Externalize the DarkSky API key, and a few other variables, to a `config.json` file, or set in the `.env` file
* We derive Latitude and Longitude from the Google Places API, and then save both Location Name and those coordinates to the database. We could have also just stored the coordinates, and re-poll the location name from those coordinates from the Pet Details Screen. But, that seemed like a silly extra API call.
* Design for Mobile. While the site is responsive, there are tweaks required for mobile screens.

## License
Copyright 2017 James Robert Perih

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

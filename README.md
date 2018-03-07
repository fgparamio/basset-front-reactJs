# Basset Front React Docker Application 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Overview

Application built with:

```
Node Verion "8.9.4"
Npm  Version "3.10.5"
Atom Version "1.24.0"

```

React Libraries in this project:

```
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-image": "^1.3.1",
    "react-infinite-scroll-component": "^3.0.2",
    "react-photo-feed": "^1.0.13",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.1.1",
    "react-spinners": "^0.2.6",
    "react-visibility-sensor": "^3.11.0"
```


Another Libraries: 

```
    "axios": "^0.18.0",      <= Rest Client 
    "bootstrap": "^4.0.0",   <= Responsive Design

```


## Demo

Open: [http://reactjsbassetfront-env.us-east-2.elasticbeanstalk.com](http://reactjsbassetfront-env.us-east-2.elasticbeanstalk.com) 

to view App in the browser.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!



### Coverage Reporting

Jest has an integrated coverage reporter that works well with ES6 and requires no configuration.<br>
Run `npm test -- --coverage` (note extra `--` in the middle) to include a coverage report like this:


Note that tests run much slower with coverage so it is recommended to run it separately from your normal workflow.


## Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

## Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)internal settings, 

The port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

## Docker

You can build your image:

```
docker build -t react-docker .

```

 Run Docker image:
 
```
docker run -it --rm -p 5000:5000 --name react-demo react-docker
 
```

 You can see that if you re-run the build command from earlier:
 
```
time docker build -t react-docker .

```

## Folder Structure

```
basset-front-reactJs/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.



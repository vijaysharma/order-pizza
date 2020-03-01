This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About this Project

There are four folders to organise this project
* components
    * This holds all the stateless components
* containers
    * This hold all stateful components
* hoc
    * This holds higher order components. Here I have only one. <Aux />. We can use React.Fragment as well. I wanted to have hoc structure in my project.
* ui
    * This hold only non-functional stateless UI specific components.
* store
    * This folder contains the redux store reducer and actions.

### To run this project locally
* clone this repository `git clone https://github.com/vijaysharma/order-pizza.git`
* run `npm install`
* Point your browser to `http://localhost:3000`
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

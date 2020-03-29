# Molecule Quickstart App

This demo React app demonstrates how to send and receive cryptocurrency payments using the Hydrogen Molecule API. Please visit the [Molecule Quickstart Guide](https://www.hydrogenplatform.com/docs/molecule-quickstart) for a full tutorial on Molecule, including code snippets used for this app.
  
## Features

- Create an account and login to your application with Hydrogen-managed OAuth 2.0 credentials
- Send cryptocurrency to other users
- Access your blockchain wallet with your username or email address
- View your transactions on the Etherscan block explorer

## Installation

1. Clone the repo to your computer. Test API keys are included in the project, but you can update `config/ConfigGlobal` with your own Hydrogen API keys if you wish.
2. `npm i`
3. `npm run start`
4. _You must disable CORS in your browser for the app to run._ For **Google Chrome** users on **Linux**, that command is `google-chrome --disable-web-security`. On **OSX**, it's `open -a Google\ Chrome --args --disable-web-security --user-data-dir`
5. Visit `localhost:3000`

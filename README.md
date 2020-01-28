# Molecule Wallet App

This simple app demonstrates how to send and receive cryptocurrency payments using the Hydrogen Molecule API.

## Features

- Create an account and login to your application with Hydrogen-managed OAuth
- Send cryptocurrency to other users
- Access your blockchain wallet with your username or email address
- View your transactions on Etherscan block explorer

## Quickstart

1. Clone the repo to your computer. Test API keys are included in the project, but you can update `config/ConfigGlobal` with your own Hydrogen API keys if you wish.
2. `npm i`
3. `npm run start`
4. _You must disable CORS in your browser for the app to run._ For **Google Chrome** users on **Linux**, that command is `google-chrome --disable-web-security`. On **OSX**, it's `open -a Google\ Chrome --args --disable-web-security --user-data-dir`
5. Visit `localhost:3000`

# Demo App Tutorial

In order to understand how you can leverage Molecule to build cryptocurrency applications, we present this brief developer guide below. If you're building a Javascript app, feel free to copy and paste the code snippets into your app. These are the same code snippets used in our [Molecule Quickstart Guide](https://github.com/hydrogen-dev/molecule-quickstart).

## Get an Auth Token

Before we can access any authenticated endpoints, we need to request an access token from the Hydrogen API server. Use your API credentials provided to you at Molecule signup to exchange those credentials for an access token.

```
async generateAccessToken() {

  let url = BASE_URL + `authorization/v1/oauth/token?grant_type=client_credentials`
  let base64 = new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64,
    },
  })

  let json = await response.json();
  accessToken = json.access_token;

  // save accessToken in localStorage
  await localStorage.setItem('accessToken', accessToken);

  return accessToken;
}
```

You'll want to persist this accessToken in your application so you can use it across all your requests. If building a web app, we like using the [`localStorage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) function to store the accessToken in our browser's key value store.

## Create a Wallet

Once you've obtained your accessToken, you're ready to start making authenticated requests to the Hydrogen Atom and Molecule APIs.

If this is your first time using Hydrogen, you must create a Nucleus client in order to create a Molecule Wallet. You'll reference the Nucleus Client that you'd like to associate with your Molecule Wallet in the request below.

_Pro-tip_: Here's the data hierarchy of account entities in Hydrogen.

- Admin (POST `admin/v1/client`)
  - Client (POST `nucleus/v1/client`)
    - Account (POST `nucleus/v1/account`)
    - Wallet (POST `molecule/v1/wallet`)
      - Wallet Key (POST `wallet_key/generator`)

In Molecule, client accounts are called _wallets_, and each wallet possesses a _key pair_, referenced through the _wallet_key_ entity. For the purpose of this demo, the only entities you need to create are (1) client (2) wallet and (3) wallet_key.

We'll need to pass the following arguments to our function: (1) a name for our wallet, and (2) our Nucleus client ID.

```
async createMoleculeWallet(walletName, clientId) {

  let accessToken = await localStorage.getItem('accessToken');
  let url = 'https://dev.hydrogenplatform.com/molecule/v1/' + 'wallet';

  let requestBody = {
    name: walletName,
    type: "individual",
    clients: [
      {
        nucleus_client_id: clientId,
        client_wallet_association_type: "owner"
      }
    ]
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  })

  const json = await response.json();

  if (response.status !== HttpStatus.OK) {
    console.log('[createMoleculeWallet] - unable to fetch', json);
    return false;
  }

  // set walletId in localStorage for easy retrieval later
  await localStorage.setItem('walletId', json.id);
  console.log('[createMoleculeWallet] - success', json);

  return json;
}
```

## Create a Key Pair

Then, we'll create a blockchain key pair for our Molecule wallet.

```
async postWalletKey() {

  let accessToken = await localStorage.getItem('accessToken');
  let walletId = await localStorage.getItem('walletId');

  let url = 'https://dev.hydrogenplatform.com/molecule/v1/' + 'wallet_key/generator';

  let payload = {
    wallet_id: walletId
  }

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  const json = await response.json();

  if (response.status !== HttpStatus.OK || HttpStatus.CREATED) {
    console.log('[postWalletKey] - unable to fetch', json);
    return false;
  }

  console.log('[postWalletKey] - success', json);
  return json;
}
```

Hooray! Now your Molecule wallet is setup, and you're ready to start creating transactions. Let's take a look at how this is done.

## Get Cryptocurrencies

Let's call a function to get all currencies available in Molecule. We'll reference one of these currencies in our transaction in the next step.

```
async getCurrencies() {

  let accessToken = await localStorage.getItem('accessToken');
  let url = 'https://dev.hydrogenplatform.com/molecule/v1/' + 'currency';

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  })

  const json = await response.json();
  const currencies = json.content;

  if (response.status !== HttpStatus.OK) {
    console.log('[getCurrencies] - unable to fetch', json);
    return [];
  }

  console.log('[getCurrencies] - success', currencies);
  return currencies;
}
```

## Send a Crypto Payment

Now, let's make a transaction to send Ethereum to another Molecule wallet. We'll need to include the following fields in our request. If you're building a wallet app, you'll want to capture these inputs from your users in the UI.

```
let payload = {
    sender_wallet_id: senderWalletId,
    receiver_wallet_id: receiverWalletId,
    currency_id: currencyId,
    amount: amount
}
```

You'll notice that we're sending Ethereum, but we haven't funded our account yet. Fortunately, each Molecule wallet in Sandbox is awarded an initial Ethereum balance to use to cover test transactions. If we make a transaction with ~.0000000000001 Ether, our transaction will go through and our counterparty will receive their Ether.

```
async sendTransaction(payload) {

  let accessToken = await localStorage.getItem('accessToken');
  let url = 'https://dev.hydrogenplatform.com/molecule/v1/' + 'currency_transfer';

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  const json = await response.json();

  if (response.status !== HttpStatus.OK) {
    console.log('[sendTransaction] - unable to fetch', json);
    return false;
  }

  console.log('[sendTransaction] - success', json);
  return json;
}
```

## View Transactions

Let's retrieve the list of our transactions to determine if the transaction was successful. You'll notice that we add a filter to our query in order to return up to 5000 records from the database. Learn more about filtering [here](https://www.hydrogenplatform.com/docs/nucleus/v1/#Filters).

```
async getTransactions() {

  let accessToken = await localStorage.getItem('accessToken');
  let url = 'https://dev.hydrogenplatform.com/molecule/v1/' + 'currency_transfer?&size=5000';

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  })

  const json = await response.json();
  const transactions = json.content;

  if (response.status !== HttpStatus.OK) {
    console.log('[getTransactions] - unable to fetch', json);
    return [];
  }

  console.log('[getTransactions] - success', transactions);
  return transactions;
}
```

You should now see your transaction in the list returned from `GET /currency_transfer`. As you can see, Molecule makes it easy to interact with the blockchain without any of the pain of tracking account states or creating raw transactions using the low-level blockchain APIs that exist today.

Using Molecule, you can extend this functionality to build your own cryptocurrency applications. We're excited to see what you build!

## Next Steps

Interested in building your own blockchain-powered app using Molecule? [Reach out to our Sales team to schedule a demo!](https://calendly.com/hydrogen-partnerships-aidan)

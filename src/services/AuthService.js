import * as HttpStatus from 'http-status-codes';
import { MOLECULE_URL, DEFAULT_CLIENT_ROLE, CLIENT_ID, CLIENT_SECRET, BASE_URL, ACCOUNT_TYPE_ID } from '../config/ConfigGlobal';
import MoleculeService from './MoleculeService';

let accessToken;

export default class AuthService {
  constructor() {
    this.getClient();
  }

  async generateAccessToken() {

    let url = BASE_URL + `authorization/v1/oauth/token?grant_type=client_credentials`
    let base64 = new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + base64,
      },
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[generateAccessToken] - unable to fetch', response);
      return false;
    }

    let json = await response.json();
    accessToken = json.access_token;
    await localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }

  async getAccessToken() {
    let accessToken = await localStorage.getItem('accessToken');
    return accessToken;
  }

  async registerUser(userInfo) {

    await this.generateAccessToken();
    await localStorage.setItem('currentUser', userInfo.username);

    let admin = await this.createAdmin(userInfo);
    if (admin === undefined) return false;

    let clientId = await this.createClient(userInfo);
    if (clientId === undefined) return false;

    let account = await this.createNucleusAccount(userInfo, clientId);
    if (account === undefined) return false;

    let walletExists = await this.getMoleculeWallet();
    if (walletExists === undefined) {
      // create molecule wallet if none are associated with the clientID
      // and save it in localstorage
      let walletId = await this.createMoleculeWallet(userInfo, clientId);
      if (walletId === undefined) return false;
      else {
        return walletId;
      }
    }

    return account;
  }

  async createMoleculeWallet(userInfo, clientId) {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'wallet';

    let requestBody = {
      name: userInfo.username,
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

    await localStorage.setItem('walletId', json.id);
    console.log('[createMoleculeWallet] - success', json);

    // create wallet key for our new user
    const moleculeService = new MoleculeService();
    await moleculeService.postWalletKey();

    return json;
  }

  async createAdmin(userInfo) {

    let accessToken = await localStorage.getItem('accessToken');
    let url = BASE_URL + `admin/v1/client`

    let requestBody = {
      username: userInfo.username,
      password: userInfo.password,
      authorities: DEFAULT_CLIENT_ROLE,
      is_account_non_expired: true,
      is_account_non_locked: true,
      is_credentials_non_expired: true,
      is_enabled: true,
    }

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status !== HttpStatus.CREATED) {
      console.log('[createAdmin] - unable to fetch', response);
      return false;
    }

    // create account type and set it in localstorage
    await this.createAccountType();

    let json = await response.json();
    console.log('[createAdmin] - success', json);
    return json;
  }

  async createAccountType() {

    let accessToken = await localStorage.getItem('accessToken');
    let url = BASE_URL + `nucleus/v1/account_type`

    let requestBody = {
      name: ACCOUNT_TYPE_ID,
    }

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[createAccountType] - unable to fetch', response);
      return false;
    }

    let json = await response.json();
    let accountType = json.id;

    console.log('[createAccountType] - success', json);
    await localStorage.setItem('accountType', accountType);

    return accountType;
  }

  async createClient(userInfo) {

    let accessToken = await localStorage.getItem('accessToken');
    let url = BASE_URL + `nucleus/v1/client`

    let requestBody = {
      username: userInfo.username,
      client_type: 'firm',
    }

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status !== HttpStatus.CREATED) {
      let json = await response.json();
      console.log('[createClient] - unable to fetch', json);
      return false;
    }


    let json = await response.json();
    console.log('[createClient] - success', json);

    let clientId = json.id;
    return clientId;
  }

  async createNucleusAccount(userInfo, clientId) {

    let accessToken = await localStorage.getItem('accessToken');
    let accountType = await localStorage.getItem('accountType');

    let url = BASE_URL + `nucleus/v1/account`

    let requestBody = {
      name: userInfo.username,
      account_type_id: accountType,
    }

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[createNucleusAccount] - unable to fetch', response);
      return false;
    }

    let json = await response.json();
    // set local storage with accountId so we can retrieve the user
    localStorage.setItem('accountId', json.id)
    console.log('[createNucleusAccount] - success', json);
    return json;
  }

  async getAccount() {

    let accountId;

    let accessToken = await localStorage.getItem('accessToken');
    let username = await localStorage.getItem('currentUser');
    let savedId = await localStorage.getItem('accountId');

    if (savedId) {
      // if we saved the account id just return the value from local storage
      accountId = savedId;
      return accountId;
    }

    // otherwise pull the account id from nucleus
    let url = BASE_URL + `nucleus/v1/account?filter=name==${username}`

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[getAccount] - unable to fetch', response);
      return false;
    }

    let json = await response.json();
    if (json.content.length === 0) {
      return false;
    }

    accountId = json.content[0].id;
    await localStorage.setItem('accountId', accountId);
    return accountId;
  }

  async getClient() {

    let currentUser;
    let url;

    url = BASE_URL + `nucleus/v1/client`
    let username = await localStorage.getItem('currentUser');

    if (username) {
      currentUser = username;
      url = BASE_URL + `nucleus/v1/client?filter=username==${currentUser}`
    }

    let accessToken = await localStorage.getItem('accessToken');

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[getClient] - unable to fetch', response);
      return false;
    }

    let clientId;
    let json = await response.json();
    if (json.content.length > 0) {
      clientId = json.content[0].id;
    }
    return clientId;
  }

  async getMoleculeWallet() {

    let url = MOLECULE_URL + 'wallet?&size=5000';
    let accessToken = await localStorage.getItem('accessToken');

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[getMoleculeWallet] - unable to fetch', response);
      return this.getAccessToken();
    }

    let data = await response.json();
    let json = data.content;
    let clientId = await localStorage.getItem('clientId');

    let walletId;

    // loop through all our wallets to find the one owned by our clientId
    for (let i in json) {
      for (let clients in json[i]['clients']) {
        if (clientId === json[i]['clients'][clients].nucleus_client_id) {
          walletId = json[i].id;
          await localStorage.setItem('walletId', walletId);
        }
      }
    }

    let molecule = new MoleculeService();
    await molecule.getBalance();

    return walletId;
  }

  async login(userInfo) {

    let base64 = new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

    let url = BASE_URL + `authorization/v1/oauth/token?grant_type=password&username=${userInfo.username}&password=${userInfo.password}`;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + base64,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.status !== HttpStatus.OK) {
      console.log('[login] - unable to fetch', response);
      return false;
    }

    let json = await response.json();
    console.log('[login] - success', json);

    let auth = {
      username: userInfo.username,
      accessToken: json.access_token,
    };

    await localStorage.setItem('currentUser', auth.username);
    await localStorage.setItem('accessToken', auth.accessToken);

    let clientId = await this.getClient();
    await localStorage.setItem('clientId', clientId);

    let walletExists = await this.getMoleculeWallet();

    if (walletExists === null || undefined) {
      // create molecule wallet if none are associated with the clientID
      let walletId = await this.createMoleculeWallet(auth, clientId);
      if (walletId === undefined) return false;
      else {
        await localStorage.setItem('walletId', walletId);
        return walletId;
      }
    }

    let accountExists = await this.getAccount();
    if (!accountExists) {
      return false;
    }

    return auth;
  };

  async clearSession() {
    return await localStorage.clear();
  }
}
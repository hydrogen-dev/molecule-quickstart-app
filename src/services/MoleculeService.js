
import AuthService from './AuthService';
import * as HttpStatus from 'http-status-codes';
import { MOLECULE_URL, } from '../config/ConfigGlobal';

export default class MoleculeService {
  constructor() {
    this.authService = new AuthService();
  }

  async getTransactions() {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'currency_transfer?&size=5000';

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

  async getTokens() {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'token';

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    const json = await response.json();
    const tokens = json.content;

    if (response.status !== HttpStatus.OK) {
      console.log('[getTokens] - unable to fetch', json);
      return [];
    }

    console.log('[getTokens] - success', tokens);
    return tokens;
  }

  async getCurrencies() {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'currency';

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

  async getWallets() {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'wallet?&size=5000';

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    const json = await response.json();
    const tokens = json.content;

    if (response.status !== HttpStatus.OK) {
      console.log('[getWallets] - unable to fetch', json);
      return [];
    }

    console.log('[getWallets] - success', tokens);
    return tokens;
  }

  async sendTransaction(payload) {

    let accessToken = await localStorage.getItem('accessToken');
    let url = MOLECULE_URL + 'currency_transfer';

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
      return this.handleError(json.message)
    }

    console.log('[sendTransaction] - success', json);
    return this.handleSuccess('sendTransaction', json);
  }

  async postWalletKey() {

    let accessToken = await localStorage.getItem('accessToken');
    let walletId = await localStorage.getItem('walletId');

    let url = MOLECULE_URL + 'wallet_key/generator';

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
      return this.handleError(json.message)
    }

    console.log('[postWalletKey] - success', json);
    return this.handleSuccess('postWalletKey', json);
  }

  async getBalance() {

    let accessToken = await localStorage.getItem('accessToken');
    let walletId = await localStorage.getItem('walletId');

    let url = MOLECULE_URL + `currency_balance?wallet_id=${walletId}&get_latest=true`;

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    const json = await response.json();

    let balance = 0;

    if (response.status !== HttpStatus.OK) {
      console.log('[getBalance] - unable to fetch', json);
      return 0;
    } else {
      if (json.content.length > 0) {
        balance = json.content[0].balance;
      }

    }

    console.log('[getBalance] - success', balance);
    return balance;
  }

  async getWalletName(walletId) {

    let accessToken = await localStorage.getItem('accessToken');

    let url = MOLECULE_URL + `wallet/${walletId}`;

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })

    const json = await response.json();

    if (response.status !== HttpStatus.OK) {
      console.log('[getWalletName] - unable to fetch', json);
      return false;
    }

    const username = json.name;
    return username;
  }

  async handleSuccess(type, json) {

    let response = {
      type: undefined,
      message: undefined,
    };

    switch (type) {
      case 'sendTransaction':
        response = {
          type: 'success',
          message: `Success! Transaction ID: ${json.id}`
        }
        return response;
      case 'postWalletKey':
        response = {
          type: 'success',
          message: `Success! Created Wallet Key ID: ${json.id}`
        }
        return response;
      default:
        break;
    }
  }

  async handleError(message) {
    let response = {
      type: undefined,
      message: undefined,
    };
    switch (message) {
      case 'No Wallet Key associated with the Sender Wallet ID entered.':
        return this.postWalletKey();
      case 'Invalid input: Amount can not be less than or equal to 0.':
        response = {
          type: 'error',
          message: message,
        }
        return response;
      case '[DecimalError] Invalid argument: .':
        response = {
          type: 'error',
          message: message,
        }
        return response;
      default:
        response = {
          type: 'error',
          message: message,
        }
        return response;
    }
  }
}

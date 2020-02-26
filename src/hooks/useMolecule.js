import { useState } from 'react';
import MoleculeService from '../services/MoleculeService';
import moment from "moment";

const useMolecule = () => {
  const moleculeService = new MoleculeService();
  const [tokenList, setTokenList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState('');
  const [walletList, setWalletList] = useState([]);
  const [balance, setBalance] = useState();
  const [pieChartData, setPieChartData] = useState();
  const [lineChartData, setLineChartData] = useState([]);

  const getTransactions = async () => {
    let response = await moleculeService.getTransactions();
    let walletId = await localStorage.getItem('walletId');
    // filter transactions that aren't related to our current wallet ID
    let myTransactions = response.filter(i => walletId === i.sender_wallet_id || walletId === i.receiver_wallet_id).reverse();
    // get the wallet names for all wallet IDs so we're not just displaying a UUID
    let walletNames = await Promise.all(myTransactions.map(async i => {
      return {
        id: i.id,
        tx_hash: i.transaction_hash,
        sender_wallet_id: await moleculeService.getWalletName(i.sender_wallet_id),
        receiver_wallet_id: await moleculeService.getWalletName(i.receiver_wallet_id),
        create_date: await moment(i.create_date).fromNow(),
        amount: i.amount,
      }
    }))

    return setTransactionList(walletNames);
  }

  const getBalance = async () => {
    let response = await moleculeService.getBalance();
    let bal = Number(response);
    return setBalance(bal);
  }

  const getTokens = async () => {
    let response = await moleculeService.getTokens();
    return setTokenList(response);
  }

  const getWallets = async () => {
    let response = await moleculeService.getWallets();
    return setWalletList(response);
  }

  const getCurrencies = async () => {
    let response = await moleculeService.getCurrencies();
    return setCurrencyList(response);
  }

  const getPieChartData = async () => {
    let response = await moleculeService.getModelHoldings();
    return setPieChartData(response);
  }

  const getLineChartData = async () => {
    const sender = await localStorage.getItem('walletId');
    let response = await moleculeService.getCurrencyBalance();
    let onlyMine = response.filter(i => i.wallet_id === sender);
    // let filtered = [{
    //   date: new Date(),
    //   price: { one: 2400 },
    //   date: new Date("2019-01-01T00:00:00.000Z"),
    //   price: { one: 3500 },
    // }]
    let filtered = onlyMine.slice(onlyMine.length - 1, onlyMine.length).map(i => ({
      date: new Date(i.update_date),
      price: {
        one: i.balance.slice(0, 6)
      }
    }))

    if (onlyMine.length === 0) {
      let data = [{
        date: new Date("2019-01-01T00:00:00.000Z"),
        price: {
          one: 0.01
        }
      }]

      return setLineChartData(data);
    }


    return setLineChartData(filtered);
  }

  const submitSend = async () => {
    const sender = await localStorage.getItem('walletId');

    let payload = {
      sender_wallet_id: sender,
      receiver_wallet_id: toAddress,
      currency_id: currency,
      amount: amount
    }

    let response = await moleculeService.sendTransaction(payload);
    return response;
  }

  return {
    getWallets,
    getTokens,
    setWalletList,
    walletList,
    tokenList,
    submitSend,
    getTransactions,
    transactionList,
    currency,
    setCurrency,
    amount,
    setAmount,
    toAddress,
    setToAddress,
    currencyList,
    setCurrencyList,
    getCurrencies,
    balance,
    getBalance,
    pieChartData,
    getPieChartData,
    lineChartData,
    getLineChartData
  };
}

export default useMolecule;
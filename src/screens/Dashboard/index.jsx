import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "../../store/AppContext";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Container from "@material-ui/core/Container";
import logo from "../../static/molecule-logo.png";
import useMolecule from "../../hooks/useMolecule";
import Navbar from "../../components/NavBar";
import Modal from "../../components/Modal";
import useStyles from "./styles";
import ReactDOM from "react-dom";
import TransactionsTable from "../../components/TransactionsTable";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [modalVisible, toggleModalVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    message: ""
  });
  // const [snackbarVisible, toggleSnackbarVisible] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const classes = useStyles();

  const {
    getTokens,
    tokenList,
    walletList,
    getWallets,
    getTransactions,
    transactions,
    currency,
    setCurrency,
    amount,
    submitSend,
    setAmount,
    toAddress,
    setToAddress,
    currencyList,
    getCurrencies,
    balance,
    getBalance,
    setTransactionList,
    getPieChartData,
    pieChartData,
    lineChartData,
    getLineChartData
  } = useMolecule();

  const handleSubmit = async () => {
    toggleLoading(!loading);
    let response = await submitSend();
    if (response) {
      toggleLoading(!loading);
      setStatusMessage(response);
    }
    toggleLoading(false);
  };

  const handleClose = () => {
    // toggleSnackbar({ open: false, type: '', message: '' })
  };

  const handleToggleModal = () => {
    toggleModalVisible(!modalVisible);
    // reset the modal and clear the content
    loading && toggleLoading(false);
    statusMessage && setStatusMessage({ type: "", message: "" });
    amount && setAmount();
    toAddress && setToAddress("");
    currency && setCurrency("");
  };

  const handleSetToAddress = event => {
    return setToAddress(event.target.value);
  };

  const handleSetAmount = event => {
    return setAmount(event.target.value);
  };

  const handleSetCurrency = event => {
    return setCurrency(event.target.value);
  };

  const handleMaxAmount = () => {
    let maxAmount;

    if (balance === 0 || undefined) {
      console.log("max");
      maxAmount = 0.0000000000001;
      return setAmount(maxAmount);
    }

    return setAmount(balance);
  };

  useEffect(() => {
    getTransactions();
    getTokens();
    getWallets();
    getCurrencies();
    getBalance();
    getPieChartData();
    getLineChartData();
  }, [setTransactionList]);

  return (
    <>
      <Navbar
        handleToggleModal={handleToggleModal}
        state={state}
        dispatch={dispatch}
        balance={balance}
      />
      <div className={classes.rootContainer}>
        {/* <LoadingSpinner isLoading={isLoading} /> */}
        {modalVisible
          ? ReactDOM.createPortal(
              <Modal
                statusMessage={statusMessage}
                currencyList={currencyList}
                handleMaxAmount={handleMaxAmount}
                walletList={walletList}
                tokenList={tokenList}
                handleSubmit={handleSubmit}
                loading={loading}
                modalVisible={modalVisible}
                handleToggleModal={handleToggleModal}
                currency={currency}
                handleSetCurrency={handleSetCurrency}
                amount={amount}
                handleSetAmount={handleSetAmount}
                toAddress={toAddress}
                handleSetToAddress={handleSetToAddress}
              />,
              document.body
            )
          : null}
        <Grid container spacing={3}>
          <PieChart
            loading={loading}
            chartData={pieChartData !== undefined ? pieChartData : []}
            title={"My Holdings"}
          />
          <BarChart
            chartData={lineChartData}
            loading={loading}
            // interval={interval}
            // handleIntervalChange={handleIntervalChange}
            securityPrices={lineChartData}
            title={"Portfolio Value"}
          />
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <TransactionsTable transactions={transactions} />
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            // open={true}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <SnackbarContent
              style={{ fontFamily: "Avenir Next" }}
              // message={snackbar.message}
              onClose={handleClose}
            />
          </Snackbar>
        </Grid>
        <Container className={classes.footerContainer}>
          <h3 className={classes.footer}>powered by</h3>
          <img src={logo} className={classes.image} alt="Logo" />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

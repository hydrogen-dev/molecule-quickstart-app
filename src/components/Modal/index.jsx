import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

function Modal({
  statusMessage,
  walletList,
  tokenList,
  handleSubmit,
  loading,
  modalVisible,
  handleToggleModal,
  submitSend,
  handleMaxAmount,
  currency,
  handleSetCurrency,
  amount,
  handleSetAmount,
  toAddress,
  handleSetToAddress,
  currencyList
}) {
  const currencyOptions = currencyList;

  const classes = useStyles();
  useEffect(() => {}, [statusMessage]);

  return (
    <Dialog open={modalVisible} onClose={handleToggleModal}>
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Send Currency
      </DialogTitle>
      {loading ? (
        <DialogContent>
          <CircularProgress className={classes.progress} />
        </DialogContent>
      ) : statusMessage.type === "success" ? (
        <DialogContent>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={4}>
              <CheckCircleIcon
                color="primary"
                fontSize="large"
                className={classes.successIcon}
              />
            </Grid>
            <Grid item xs={10}>
              <DialogContentText className={classes.dialogContent}>
                {statusMessage.message !== undefined
                  ? statusMessage.message
                  : ""}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      ) : statusMessage.type === "error" ? (
        <DialogContent>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={4}>
              <WarningIcon
                fontSize="large"
                color="error"
                className={classes.successIcon}
              />
            </Grid>
            <Grid item xs={10}>
              <DialogContentText className={classes.dialogContent}>
                {statusMessage.message !== undefined
                  ? statusMessage.message
                  : ""}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      ) : (
        <DialogContent className={classes.formDialog}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel className={classes.inputLabel} htmlFor="email">
              Currency
            </InputLabel>
            <Select
              className={classes.selectCurrency}
              value={currency}
              onChange={handleSetCurrency}
            >
              {currencyOptions.map(i => (
                <MenuItem className={classes.menuItem} key={i.id} value={i.id}>
                  {<div style={{ justifyContent: "flex-start" }}>{i.name}</div>}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <Input
              id="outlined-basic"
              label="amount"
              endAdornment={
                <InputAdornment position="end">
                  <Button disabled={currency === ""} onClick={handleMaxAmount}>
                    Max
                  </Button>
                </InputAdornment>
              }
              variant="outlined"
              value={amount}
              onChange={handleSetAmount}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel className={classes.inputLabel} htmlFor="email">
              Recipient
            </InputLabel>
            <Select
              className={classes.selectCurrency}
              value={toAddress}
              onChange={handleSetToAddress}
            >
              {walletList.map(i => (
                <MenuItem
                  className={classes.selectCurrency}
                  key={i.id}
                  value={i.id}
                >
                  {i.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disabled={currency === "" || amount === "" || toAddress === ""}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default Modal;

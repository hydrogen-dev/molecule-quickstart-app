import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import useMolecule from "../../hooks/useMolecule";
import useStyles from "./styles";
import { NETWORK } from "../../config/ConfigGlobal";

function TokenGrid() {
  const { getCurrencies, currencyList } = useMolecule();

  useEffect(() => {
    getCurrencies();
  }, []);

  const handleClick = item => {
    return window.open(
      `https://${NETWORK}.etherscan.io/tx/${item.tx_hash}`,
      "_blank"
    );
  };

  const CardItem = ({ item }) => {
    console.log(item);
    return (
      <Paper elevation={2} className={classes.currencyCard}>
        <Grid container xs={12} className={classes.currencyCardContainer}>
          <Grid item xs={2}>
            <img src={item.logo} className={classes.currencyLogo} />
          </Grid>
          <Grid item xs={10} className={classes.currencyCardTitle}>
            <Typography variant={"h5"}> {item.name}</Typography>
            <Typography variant={"h6"}>$200.30</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const classes = useStyles();
  return (
    <Grid container xs={12} className={classes.cardGrid}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.transactionsHeader}>
          Your Tokens
        </Typography>
      </Grid>
      {currencyList.length < 1 ? (
        <Typography variant="h6" className={classes.emptyTable}>
          No currencies yet
        </Typography>
      ) : (
        currencyList.map(item => (
          <Grid spacing={3} item xs={6} className={classes.cardColumn}>
            <CardItem item={item} id={item.id} key={item.id} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default TokenGrid;

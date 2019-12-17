import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import useMolecule from "../../hooks/useMolecule";
import useStyles from "./styles";
import { NETWORK } from "../../config/ConfigGlobal";

function TransactionsTable() {
  const { getTransactions, transactionList } = useMolecule();

  useEffect(() => {
    getTransactions();
  }, []);

  const handleClick = item => {
    return window.open(
      `https://${NETWORK}.etherscan.io/tx/${item.tx_hash}`,
      "_blank"
    );
  };

  const RowItem = ({ item }) => {
    return (
      <ListItem
        button
        key={item.id}
        onClick={() => handleClick(item)}
        divider
        style={{ backgroundColor: "#F5F7F9", marginBottom: 5 }}
      >
        <Grid item xs={3}>
          {item.amount}
        </Grid>
        <Grid item xs={3}>
          {item.sender_wallet_id}
        </Grid>
        <Grid item xs={3}>
          {item.receiver_wallet_id}
        </Grid>
        <Grid item xs={3}>
          {item.create_date}
        </Grid>
      </ListItem>
    );
  };

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12}>
      <Typography variant="h4" className={classes.transactionsHeader}>
        Recent Transactions
      </Typography>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid
            item
            style={{ padding: 5 }}
            justify="space-between"
            container
            xs={12}
          >
            <Grid item xs={3}>
              Amount
            </Grid>
            <Grid item xs={3}>
              From
            </Grid>
            <Grid item xs={3}>
              To
            </Grid>
            <Grid item xs={3}>
              Date
            </Grid>
          </Grid>
          {transactionList.length < 1 ? (
            <Typography variant="h6" className={classes.emptyTable}>
              No transactions yet
            </Typography>
          ) : (
            transactionList.map(item => (
              <RowItem item={item} id={item.id} key={item.id} />
            ))
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TransactionsTable;

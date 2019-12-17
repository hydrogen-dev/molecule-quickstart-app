import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navbar: {
    margin: 40,
    fontFamily: "Avenir Next"
  },
  settingsButton: {
    fontFamily: "Avenir Next"
  },
  card: {
    minHeight: 400,
    marginTop: 20,
    justifyContent: "space-between"
  },
  transactionsHeader: {
    textAlign: "center",
    padding: 20,
    color: "#f50057"
  },
  emptyTable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  buttonRow: {
    padding: 20
  },
  cardContent: {
    fontFamily: "Avenir Next"
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
  },
  title: {
    fontFamily: "Avenir Next",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
  }
});

export default useStyles;

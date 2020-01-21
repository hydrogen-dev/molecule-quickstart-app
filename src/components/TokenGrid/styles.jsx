import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navbar: {
    margin: 40,
    fontFamily: "Avenir Next"
  },
  settingsButton: {
    fontFamily: "Avenir Next"
  },
  card: {},
  transactionsHeader: {
    textAlign: "flex-start",
    padding: 20,
    color: "#f50057"
  },
  currencyCardTitle: {},
  cardGrid: {},
  currencyLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    padding: 5
  },
  cardColumn: {
    bottom: -10,
    padding: 0
  },
  currencyCardContainer: {},
  currencyCard: {
    minheight: 100,
    padding: 5,
    margin: 5
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

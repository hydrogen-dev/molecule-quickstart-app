import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  MenuItem: {
    fontFamily: "Avenir Next",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dialogTitle: {
    fontFamily: "Avenir Next",
    color: "#f50057",
    fontWeight: "bold",
    padding: 25,
    textAlign: "center"
  },
  dialogContent: {
    justifyContent: "center",
    marginTop: 25,
    textAlign: "center",
    fontFamily: "Avenir Next"
  },
  formDialog: {
    justifyContent: "center",
    padding: 50
  },
  progress: {
    padding: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  selectCurrency: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Avenir Next"
  },
  inputLabel: {
    fontFamily: "Avenir Next"
  },
  successIcon: {
    fontSize: 100,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center"
  },
  button: {
    textAlign: "center",
    width: "100%",
    marginTop: 30
  }
});

export default useStyles;

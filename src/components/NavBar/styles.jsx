import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navbar: {
    fontFamily: "Avenir Next",
    width: "100%",
    padding: 20
  },
  title: {
    fontFamily: "Avenir Next",
    fontWeight: "light",
    color: "white",
    flexGrow: 1
  },
  balanceTitle: {
    fontFamily: "Avenir Next",
    fontWeight: "light",
    color: "rgba(255, 255, 255, 0.5)",
    flexGrow: 1
  },
  settingsButton: {
    fontFamily: "Avenir Next",
    padding: 20
  }
});

export default useStyles;

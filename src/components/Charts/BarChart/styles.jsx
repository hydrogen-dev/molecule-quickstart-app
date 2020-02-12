import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navbar: {
    flexGrow: 1,
    fontFamily: "Avenir Next"
  },
  settingsButton: {
    fontFamily: "Avenir Next"
  },
  card: {
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  cardContent: {
    fontFamily: "Avenir Next",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
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
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
  }
});

export default useStyles;

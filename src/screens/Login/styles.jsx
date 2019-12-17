import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 100,
    marginRight: 100,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Avenir Next"
  },
  button: {
    fontFamily: "Avenir Next"
  },
  image: {
    width: "10%",
    alignItems: "center"
  },
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  progress: {
    marginTop: 15,
    marginBottom: 15
  },
  paper: {
    marginTop: 100,
    marginBottom: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 150,
    fontFamily: "Avenir Next"
  },
  avatar: {
    margin: 100,
    backgroundColor: "pink"
  },
  form: {
    fontFamily: "Avenir Next",
    width: "100%", // Fix IE 11 issue.
    marginTop: 50
  },
  submit: {
    marginTop: 100
  }
});

export default useStyles;

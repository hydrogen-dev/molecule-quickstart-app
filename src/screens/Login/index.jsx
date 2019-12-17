import React, { useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { AppContext } from "../../store/AppContext";
import AuthService from "../../services/AuthService";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import logo from "./../../static/molecule-logo.png";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, toggleLoading] = useState(false);
  const [registerModal, toggleRegisterModal] = useState(false);
  const [snackbar, toggleSnackbar] = useState({
    open: false,
    type: "",
    message: ""
  });
  const { dispatch } = useContext(AppContext);

  const handleClose = () => {
    return toggleSnackbar({ open: false, type: "", message: "" });
  };

  const submitLogin = async () => {
    toggleLoading(true);

    let userInfo = {
      username: username,
      password: password
    };

    let authService = new AuthService();
    let auth = await authService.login(userInfo);

    if (!auth) {
      toggleLoading(false);
      return toggleSnackbar({
        open: true,
        type: "error",
        message: "error logging in."
      });
    }

    await dispatch({
      type: "USER_LOGGED_IN",
      payload: {
        user: userInfo.username,
        accessToken: auth
      }
    });

    return toggleLoading(false);
  };

  const createAccountModal = () => {
    return toggleRegisterModal(!registerModal);
  };

  const registerUser = async () => {
    toggleLoading(true);

    let userInfo = {
      username: username,
      password: password
    };

    let authService = new AuthService();
    let auth = await authService.registerUser(userInfo);
    if (!auth) {
      toggleLoading(false);
      return toggleSnackbar({
        open: true,
        type: "error",
        message: "error making account."
      });
    }

    toggleLoading(false);
    return toggleSnackbar({
      open: true,
      type: "success",
      message: "success! you may login now."
    });
  };

  const callRegister = e => {
    e.preventDefault();
    return registerUser();
  };

  const callLogin = e => {
    e.preventDefault();
    return submitLogin();
  };

  const classes = useStyles();
  return (
    <main className={classes.main}>
      <CssBaseline />
      {registerModal ? (
        <Paper className={classes.paper}>
          <Typography component="h1" style={{ fontFamily: "Avenir Next" }}>
            Register
          </Typography>
          <form style={{ fontFamily: "Avenir Next" }}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={event => setUsername(event.target.value)}
                value={username}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
            </FormControl>
            <div>
              <Button
                className={classes.button}
                style={{ fontFamily: "Avenir Next" }}
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                onClick={callRegister}
              >
                Register
              </Button>
              <Button
                className={classes.button}
                style={{ fontFamily: "Avenir Next" }}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={createAccountModal}
              >
                Login with Existing Account
              </Button>
            </div>
            {loading && (
              <LinearProgress className={classes.progress} color="secondary" />
            )}
          </form>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography component="h1" style={{ fontFamily: "Avenir Next" }}>
            Login
          </Typography>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={event => setUsername(event.target.value)}
                value={username}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
            </FormControl>
            <Button
              className={classes.button}
              style={{ fontFamily: "Avenir Next" }}
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              onClick={callLogin}
            >
              Sign in
            </Button>
            <Button
              className={classes.button}
              style={{ fontFamily: "Avenir Next" }}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={createAccountModal}
            >
              Create Account
            </Button>
            {loading && (
              <LinearProgress className={classes.progress} color="secondary" />
            )}
          </form>
        </Paper>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ fontFamily: "Avenir Next" }}
          onClose={handleClose}
          message={snackbar.message}
        />
      </Snackbar>
      <Container className={classes.footerContainer}>
        <h3 className={classes.footer}>powered by</h3>
        <img src={logo} className={classes.image} alt="Logo" />
      </Container>
    </main>
  );
}

export default Login;

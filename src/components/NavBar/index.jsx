import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import useStyles from "./styles";

function Navbar({ state, dispatch, handleToggleModal, balance }) {
  const classes = useStyles();

  const handleLogout = async () => {
    await localStorage.clear();
    await dispatch({ type: "USER_LOGGED_OUT" });
    return (window.location.href = "/");
  };

  return (
    <>
      <AppBar className={classes.navbar} position="sticky">
        <Toolbar>
          <Grid
            container
            className={classes.buttonRow}
            direction="column"
            justify="flex-end"
            alignItems="stretch"
          >
            <Typography variant="h6" className={classes.title}>
              {state.user !== undefined ? `Welcome ${state.user}!` : ""}
            </Typography>
            <Typography variant="h6" className={classes.balanceTitle}>
              {balance !== 0 || undefined
                ? `Balance: ${balance} ETH`
                : `Balance: ${0.01} ETH`}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.buttonRow}
            direction="row"
            justify="flex-end"
            alignItems="stretch"
          >
            <ButtonGroup
              variant="contained"
              color="secondary"
              size="large"
              aria-label="large outlined secondary button group"
            >
              <Button
                onClick={handleToggleModal}
                variant="contained"
                color="secondary"
                className={classes.settingsButton}
              >
                Send
              </Button>
              <Button
                onClick={() => handleLogout()}
                variant="contained"
                color="primary"
                className={classes.settingsButton}
              >
                Logout
              </Button>
            </ButtonGroup>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;

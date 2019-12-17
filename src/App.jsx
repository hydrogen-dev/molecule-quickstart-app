import React, { useReducer, useState, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard/index";
import { AppContext } from "./store/AppContext";
import { MainReducer } from "./store/Reducer";

export default function App() {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(MainReducer, initialState);
  const value = { state, dispatch };
  const [accessToken, setAccessToken] = useState();

  const checkAuth = async () => {
    let storedToken = await localStorage.getItem("accessToken");
    let storedUser = await localStorage.getItem("currentUser");
    if (storedToken) {
      await dispatch({
        type: "USER_LOGGED_IN",
        payload: { accessToken: storedToken, user: storedUser }
      });

      setAccessToken(storedToken);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [accessToken]);

  return (
    <AppContext.Provider value={value}>
      <AppContext.Consumer>
        {context => (
          <Router>
            {!context.state.accessToken ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/dashboard" />
            )}
            <Switch>
              <Route
                path="/"
                exact={true}
                strict={true}
                component={Dashboard}
              />
              <Route
                path="/login"
                exact={true}
                strict={true}
                component={Login}
              />
              <Route
                path="/dashboard"
                exact={true}
                strict={true}
                component={Dashboard}
              />
            </Switch>
          </Router>
        )}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}

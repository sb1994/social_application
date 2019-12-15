import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import axios from "axios";
import setUserToken from "./utils/setUserToken";

import jwt_decode from "jwt-decode";
import store from "./store";
import { setLoggedUser, logoutUser } from "./actions/userAuthActions";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavBar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
// import jwt_decode from "jwt-decode";
import axios from "axios";
if (localStorage.token) {
  // console.log(localStorage.token);
  setUserToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  // console.log(decoded);

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded));

  /// Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(setLoggedUser());
    // Redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  componentDidMount() {
    console.log("Sean Boyle");
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavBar />
            <div className="row">
              <div className="md-12">
                <div className="container">
                  <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                  </Switch>
                </div>
              </div>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

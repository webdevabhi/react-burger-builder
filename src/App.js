import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import assyncComponent from "./hoc/assyncComponent/assyncComponent";

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const assyncCheckout = assyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const assyncOrders = assyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const assyncAuth = assyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={assyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={assyncCheckout} />
          <Route path="/orders" component={assyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={assyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(App));

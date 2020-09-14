import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from 'components/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from 'containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import asyncComponent from 'hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckLoggedIn();
  }

  render() {
    return (
      <div className="App">
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <Switch>
            {this.props.isAuthenticated ? 
              <Route path="/checkout" component={asyncCheckout} /> : null}
            {this.props.isAuthenticated ? 
              <Route path="/orders" component={asyncOrders} /> : null}
            <Route path="/auth" component={asyncAuth} />
            {this.props.isAuthenticated ? 
              <Route path="/logout" component={Logout} /> : null}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
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

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckLoggedIn: () => dispatch(actions.authCheckLoggedIn())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));

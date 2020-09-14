import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from "components/Layout/Layout";
import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Checkout from 'containers/Checkout/Checkout';
import Orders from 'containers/Orders/Orders';
import Logout from 'containers/Auth/Logout/Logout';
import Auth from 'containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from "store/actions/index";

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
              <Route path="/checkout" component={Checkout} /> : null}
            {this.props.isAuthenticated ? 
              <Route path="/orders" component={Orders} /> : null}
            <Route path="/auth" component={Auth} />
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

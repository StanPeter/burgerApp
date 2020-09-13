import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from "components/Layout/Layout";
import BurgerBuilder from "containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import Checkout from 'containers/Checkout/Checkout';
import Orders from 'containers/Orders/Orders';
import Auth from 'containers/Auth/Auth';

class App extends Component {
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(() => {this.setState({show: false})}, 5000);
  // }
  
  render() {
    return (
      <div className="App">
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgetBuilder from "./containers/BurgetBuilder/BurgetBuilder";
import { Route, Switch } from "react-router-dom";
import Checkout from './containers/Checkout/Checkout';

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
          {/* {this.state.show ? <BurgetBuilder /> : null} */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgetBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

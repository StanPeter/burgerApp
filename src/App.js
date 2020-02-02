import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgetBuilder from "./containers/BurgetBuilder/BurgetBuilder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgetBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;

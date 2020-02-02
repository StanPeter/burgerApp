import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <h1>works</h1>
        </Layout>
      </div>
    );
  }
}

export default App;

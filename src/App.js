import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgetBuilder from "./containers/BurgetBuilder/BurgetBuilder";

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
          <BurgetBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import NodeView from './components/node_view';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <NodeView />
      </MuiThemeProvider>
    );
  }
}

export default App;

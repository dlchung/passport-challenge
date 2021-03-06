import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';import * as firebase from 'firebase';
import NodeRoot from './components/node_root';

import DialogAdd from './components/dialog_add';

const firebaseConfig = {
  apiKey: "AIzaSyDlGymK7eK3hlYLgYyIkN_psbbjGSz74FY",
  authDomain: "passport-challenge-92a65.firebaseapp.com",
  databaseURL: "https://passport-challenge-92a65.firebaseio.com",
  projectId: "passport-challenge-92a65",
  storageBucket: "passport-challenge-92a65.appspot.com",
  messagingSenderId: "1077073664940",
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      parentNodes: '',
    };
  }

  componentDidMount() {
    // get data from firebase and set it to state
    const dbRef = firebase.database().ref().child('nodes');
    dbRef.on('value', snap => {
      if(snap.val()) {
        this.setState({
          parentNodes: snap.val(),
        });
      } else {
        this.setState({
          parentNodes: '',
        });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="site-wrap">
          <div className="logo"></div>
          <div className="credit">
            <p>Coded and designed by Daniel Chung. Source: <a href="https://github.com/dlchung/passport-challenge">https://github.com/dlchung/passport-challenge</a></p>
          </div>
          <div className="node-view">
            <div className="node-root-bar">
              <h2>Root</h2>
              <div className="dialog-add-wrap">
                <DialogAdd parentNodes={this.state.parentNodes} />
              </div>
            </div>
            <ul className="node-root tree">
                <NodeRoot parentNodes={this.state.parentNodes} />
            </ul>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

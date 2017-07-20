import React, { Component } from 'react';
import * as firebase from 'firebase';
import NodeRoot from './node_root';
import DialogAdd from './dialog_add';

const firebaseConfig = {
  apiKey: "AIzaSyDlGymK7eK3hlYLgYyIkN_psbbjGSz74FY",
  authDomain: "passport-challenge-92a65.firebaseapp.com",
  databaseURL: "https://passport-challenge-92a65.firebaseio.com",
  projectId: "passport-challenge-92a65",
  storageBucket: "passport-challenge-92a65.appspot.com",
  messagingSenderId: "1077073664940",
};
firebase.initializeApp(firebaseConfig);

export default class NodeView extends Component {
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
      <div className="node-view">
        This is the node view.
        <DialogAdd parentNodes={this.state.parentNodes} />
        <NodeRoot parentNodes={this.state.parentNodes} />
      </div>
    );
  }
}

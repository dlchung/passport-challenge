import React, { Component } from 'react';
import * as firebase from 'firebase';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const firebaseConfig = {
  apiKey: "AIzaSyDlGymK7eK3hlYLgYyIkN_psbbjGSz74FY",
  authDomain: "passport-challenge-92a65.firebaseapp.com",
  databaseURL: "https://passport-challenge-92a65.firebaseio.com",
  projectId: "passport-challenge-92a65",
  storageBucket: "passport-challenge-92a65.appspot.com",
  messagingSenderId: "1077073664940",
};
firebase.initializeApp(firebaseConfig);

var parentNodes = [];

export default class NodeRoot extends Component {
  constructor(props) {
    super();

    this.state = {
      parentNodes: '',
    };

    this.addParent = this.addParent.bind(this);
  }

  componentDidMount() {
    // get data from firebase and setState
    const dbRefObject = firebase.database().ref().child('nodes');
    dbRefObject.on('value', snap => {
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

  renderNodes() {
    let nodes = this.state.parentNodes;
    // iterate through nodes data object
    return Object.keys(nodes).map(function(keyName, keyIndex) {
      let obj = nodes[keyName];
      return (
        <li className="node-parent" key={keyIndex}>
        {obj.parentLabel}
          <ol>
            {
              // mapping through child nodes for each parent here
              obj.parentChildren.map(function(props, index) {
                return (
                  <li className="node-child" key={index}>{props}</li>
                );
              })
            }
          </ol>
        </li>
      );
    });
  }

  addParent() {
    // temporary to generate dummy data
    var label = this.generateRandomNumber(0,1000);
    var lower = this.generateRandomNumber(0,9);
    var upper = this.generateRandomNumber(10,100);
    var quantity = this.generateRandomNumber(1,15);
    var children = this.generateChildNodes(lower, upper, quantity);

    if( this.state.parentNodes ) {
      parentNodes = this.state.parentNodes.concat({
        parentLabel: label,
        parentLower: lower,
        parentUpper: upper,
        parentQuantity: quantity,
        parentChildren: children
      });
    }

    this.setState({
      parentNodes: parentNodes,
    });

    this.writeNodeData(parentNodes);
  }

  generateChildNodes(lower, upper, quantity) {
    var childValueArray = [];
    var i;
    for(i = 0; i < quantity; i++) {
      var childValue = this.generateRandomNumber(lower, upper);
      childValueArray.push(childValue);
    }

    return childValueArray;
  }

  generateRandomNumber(min, max) { // both inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  writeNodeData(data) {
    firebase.database().ref('nodes').set(data);
  }

  render() {
    return(
      <ul className="node-root">
        This is the root view.
        <button onTouchTap={this.addParent}> + </button>
        {this.renderNodes()}
      </ul>
    );
  }
}

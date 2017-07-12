import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var parentNodes = [];

export default class NodeRoot extends Component {
  constructor(props) {
    super();

    this.state = {
      parentLabel: '',
      parentLower: '',
      parentUpper: '',
      parentQuantity: '',
      parentChildren: '',
      childArray: ''
    };

    this.addParent = this.addParent.bind(this);
  }

  renderNodes() {
    return parentNodes.map(function(props, index) { // map through parentNodes
      return (
        <li className="node-parent" key={index}>
          {props.parentLabel} This is a parent node.
          <ol className="node_child">
            {
              // mapping through child nodes for each parent here
              props.parentChildren.map(function(props, index) {
                return (
                  <li key={index}>{props}</li>
                );
              })
            }
          </ol>
        </li>
      );
    });
  }

  addParent() {
    var label = this.generateRandomNumber(0,1000);
    var lower = this.generateRandomNumber(0,9);
    var upper = this.generateRandomNumber(10,100);
    var quantity = this.generateRandomNumber(1,15);
    var children = this.generateChildNodes(lower, upper, quantity);


    this.setState({
      parentLabel: label,
      parentLower: lower,
      parentUpper: upper,
      parentQuantity: quantity
    });

    parentNodes = parentNodes.concat({
      parentLabel: label,
      parentLower: lower,
      parentUpper: upper,
      parentQuantity: quantity,
      parentChildren: children
    });

    console.log(parentNodes);
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

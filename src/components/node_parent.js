import React, { Component } from 'react';
import NodeChild from './node_child';

var childArray = [];

export default class NodeParent extends Component {
  constructor(props) {
    super();

    this.state = {
      childArray: childArray
    }

  }
  renderNodes() {
    // childArray = childArray.concat([this.generateChildNodes()]);
    // console.log(childArray);
    return childArray.map(function(props, index) {
      return (
        <NodeChild key={index} />
      )
    });
  }

  generateChildNodes() {
    var childValueArray = [];
    var i;
    for(i = 0; i < this.props.quantity; i++) {
      var childValue = this.generateRandomNumber(this.props.lower, this.props.upper);
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
    // console.log(this.props);
    return (
      <li className="node-parent">
        {this.props.label}
        <ul>{this.renderNodes()}</ul>
      </li>
    );
  }
}

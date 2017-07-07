import React, { Component } from 'react';
import NodeParent from './node_parent';

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
      parentChildren: ''
    };

    this.addParent = this.addParent.bind(this);
  }

  renderNodes() {
    // console.log(parentNodes);

    return parentNodes.map(function(props, index) {
      return (
        <NodeParent
          key={index}
          label={props.parentLabel}
          lower={props.parentLower}
          upper={props.parentUpper}
          quantity={props.parentQuantity}
          children={props.parentChildren}
        />
      );
    });
  }

  addParent() {
    var label = this.generateRandomNumber(0,1000);
    var lower = this.generateRandomNumber(0,9);
    var upper = this.generateRandomNumber(10,100);
    var quantity = this.generateRandomNumber(1,15);

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
      parentChildren: ''
    });

    console.log(parentNodes);
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
        {this.renderNodes()}
      </ul>
    );
  }
}

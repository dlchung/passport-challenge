import React, { Component } from 'react';
import NodeParent from '../components/node_parent';

export default class NodeRoot extends Component {
  renderNodes() {

  }

  addParent() {
    console.log('adding parent');
  }

  render() {
    return(
      <div className="node-root">
        This is the root view.
        <button onClick={this.addParent}>+ parent</button>
        <NodeParent />
      </div>
    );
  }
}

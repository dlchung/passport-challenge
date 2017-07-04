import React, { Component } from 'react';
import NodeChild from '../components/node_child';

export default class NodeParent extends Component {
  render() {
    return (
      <div className="node-parent">
        This is a parent node.
        <NodeChild />
      </div>
    );
  }
}

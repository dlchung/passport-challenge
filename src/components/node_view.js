import React, { Component } from 'react';
import NodeRoot from './node_root';

export default class NodeView extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="node-view">
        This is the node view.
        <NodeRoot />
      </div>
    );
  }
}

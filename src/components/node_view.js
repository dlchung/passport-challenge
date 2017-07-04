import React, { Component } from 'react';
import NodeRoot from '../components/node_root';

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

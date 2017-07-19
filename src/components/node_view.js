import React, { Component } from 'react';
import NodeRoot from './node_root';
import DialogAdd from './dialog_add';

var parentNodes;

export default class NodeView extends Component {
  render() {
    return (
      <div className="node-view">
        This is the node view.
        <DialogAdd />
        <NodeRoot />
      </div>
    );
  }
}

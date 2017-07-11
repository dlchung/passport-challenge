import React, { Component } from 'react';
import NodeRoot from './node_root';
// import DialogAdd from './dialog_add';

export default class NodeView extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="node-view">
        This is the node view.
        {/* <DialogAdd /> */}
        <NodeRoot />
      </div>
    );
  }
}

import React, { Component } from 'react';
// import * as firebase from 'firebase';
import DialogEdit from './dialog_edit';

export default class NodeRoot extends Component {
  constructor(props) {
    super();

  }

  renderNodes() {
    let nodes = this.props.parentNodes;
    // iterate through nodes data object
    return Object.keys(nodes).map(function(keyName, keyIndex) {
      let obj = nodes[keyName];
      return (
        <li className="node-parent" key={keyIndex}>
        {obj.parentLabel} - <DialogEdit parentData={obj} />
          <ol>
            {
              // mapping through child nodes for each parent here
              obj.parentChildren ? obj.parentChildren.map(function(props, index) {
                return (
                  <li className="node-child" key={index}>{props}</li>
                );
              }) : null
            }
          </ol>
        </li>
      );
    });
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

import React, { Component } from 'react';
import * as firebase from 'firebase';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';

const numChildItems = [];
// populate num child nodes select dropdown
const maxChildren = 15;
for (let i = 0; i <= maxChildren; i++)
  numChildItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

export default class DialogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      parentLabel: this.props.parentData.parentLabel,
      parentLower: this.props.parentData.parentLower,
      parentUpper: this.props.parentData.parentUpper,
      parentQuantity: this.props.parentData.parentQuantity,
      parentChildren: this.props.parentData.parentChildren,
    }
  }

  componentDidMount() {
  }

  handleOpen = () => { this.setState({ open: true }); };
  handleClose = () => { this.setState({ open: false }); };
  handleChange = (event, index, value) => {
    const target = event.target;
    const name = target.name;
    // use name attr to determine if SelectField
    name ? (this.setState({ [name]: target.value })) : this.setState({ parentQuantity: value });
  };

  handleSubmit = () => {
    // if these values are modified, generate new children
    var getNewChildNodes = false;
    if (this.props.parentData.parentLower !== this.state.parentLower) { getNewChildNodes = true; }
    if (this.props.parentData.parentUpper !== this.state.parentUpper) { getNewChildNodes = true; }
    if (this.props.parentData.parentQuantity !== this.state.parentQuantity) { getNewChildNodes = true; }

    var newChildNodes = this.state.parentChildren;
    if (getNewChildNodes) {
      newChildNodes = this.generateChildNodes(
      this.state.parentLower,
      this.state.parentUpper,
      this.state.parentQuantity)
    }

    var data = [{
      parentLabel: this.state.parentLabel,
      parentLower: this.state.parentLower,
      parentUpper: this.state.parentUpper,
      parentQuantity: this.state.parentQuantity,
      parentChildren: newChildNodes,
    }];
    this.updateNodeData(data, this.props.keyIndex);
    this.setState({ open: false });
  }

  updateNodeData(data, keyIndex) {
    //firebase.database().ref('nodes').child(keyIndex).set(data);

    //console.log(newKey);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div>
        <RaisedButton label="Edit" onTouchTap={this.handleOpen} />
        <Dialog
          title="Edit Parent Node"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="parentLabel"
            onChange={this.handleChange}
            hintText="Parent Label"
            value={this.state.parentLabel}
          />
          <br />
          <SelectField
            floatingLabelText="How many child nodes?"
            value={this.state.parentQuantity}
            onChange={this.handleChange}
            autoWidth={true}
          >
            {numChildItems}
          </SelectField>
          <br />
          <TextField
            name="parentLower"
            onChange={this.handleChange}
            hintText="0"
            floatingLabelText="Child node min value"
            floatingLabelFixed={true}
            value={this.state.parentLower}
          />&nbsp;
          <TextField
            name="parentUpper"
            onChange={this.handleChange}
            hintText="1000"
            floatingLabelText="Child node max value"
            floatingLabelFixed={true}
            value={this.state.parentUpper}
          />
        </Dialog>
      </div>
    );
  }
}

import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const numChildItems = [];
const maxChildren = 15;
for (let i = 0; i <= maxChildren; i++)
  numChildItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

export default class AddDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => { this.setState({ open: true }); };
  handleClose = () => { this.setState({ open: false }); };
  handleChange = (event, index, value) => { this.setState({value}); };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Add a Parent Node"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Parent Label"
          />
          <br />
          <SelectField
            floatingLabelText="How many child nodes?"
            value={this.state.value}
            onChange={this.handleChange}
            autoWidth={true}
          >
            {numChildItems}
          </SelectField>
          <br />
          <TextField
            hintText="0"
            floatingLabelText="Child node min value"
            floatingLabelFixed={true}
          />&nbsp;
          <TextField
            hintText="1000"
            floatingLabelText="Child node max value"
            floatingLabelFixed={true}
          />
        </Dialog>
      </div>
    );
  }
}

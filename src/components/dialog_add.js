import React, { Component } from 'react';
import * as firebase from 'firebase';

// import { withStyles, createStyleSheet } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import Divider from 'material-ui/Divider';

// const styleSheet = createStyleSheet('FlatButtons', theme => ({
//   button: {
//     margin: theme.spacing.unit,
//   },
// }));

const numChildItems = [];
// populate num child nodes select dropdown
const maxChildren = 15;
for (let i = 0; i <= maxChildren; i++)
  numChildItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

export default class AddDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => { this.setState({ open: true }); };
  handleClose = () => { this.setState({ open: false }); };
  handleChange = (event, index, value) => {
    const target = event.target;
    const name = target.name;
    // use name attr to determine if SelectField
    name ? (this.setState({ [name]: target.value })) : this.setState({ parentQuantity: value });
  };

  handleSubmit = () => {
    var data = [{
      parentLabel: this.state.parentLabel,
      parentLower: this.state.parentLower,
      parentUpper: this.state.parentUpper,
      parentQuantity: this.state.parentQuantity,
      parentChildren: this.generateChildNodes(
        this.state.parentLower,
        this.state.parentUpper,
        this.state.parentQuantity),
    }];
    console.log(this.props.parentNodes);
    // if this.props.parentNodes is empty, then do not concat
    if(this.props.parentNodes) { data = this.props.parentNodes.concat(data); }
    this.writeNodeData(data);
    this.setState({ open: false });
  }

  generateChildNodes(lower, upper, quantity) {
    var childValueArray = [];
    var i;
    for(i = 0; i < quantity; i++) {
      var childValue = this.generateRandomNumber(lower, upper);
      childValueArray.push(childValue);
    }

    return childValueArray;
  }

  generateRandomNumber(min, max) { // both inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  writeNodeData(data) {
    firebase.database().ref('nodes').set(data);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];

    return (
      <div>
        <FlatButton label="Dialog" onClick={this.handleOpen} />
        <Dialog
          title="Add a Parent Node"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="parentLabel"
            onChange={this.handleChange}
            hintText="Parent Label"
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
          />&nbsp;
          <TextField
            name="parentUpper"
            onChange={this.handleChange}
            hintText="1000"
            floatingLabelText="Child node max value"
            floatingLabelFixed={true}
          />
        </Dialog>
      </div>
    );
  }
}

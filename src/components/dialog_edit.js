import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionBuild from 'material-ui/svg-icons/action/build';

const numChildItems = [];
// populate num child nodes select dropdown
const maxChildren = 15;
for (let i = 0; i <= maxChildren; i++)
  numChildItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

const iconStyles = {
  tinyIcon: {
    width: 16,
    height: 16,
  },
  tiny: {
    width: 32,
    height: 32,
    padding: 0,
  },
};

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
      key: this.props.parentData.key,
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

    var data = {
      parentLabel: this.state.parentLabel,
      parentLower: this.state.parentLower,
      parentUpper: this.state.parentUpper,
      parentQuantity: this.state.parentQuantity,
      parentChildren: newChildNodes,
      key: this.state.key,
    };
    this.updateNodeData(data);
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

  updateNodeData(data) {
    var updates = {};
    updates['nodes/' + data.key] = data;

    firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div className="dialog-edit">
        <IconButton
          tooltip="Edit"
          tooltipPosition="bottom-center"
          onTouchTap={this.handleOpen}
          iconStyle={iconStyles.tinyIcon}
          style={iconStyles.tiny}
        >
          <ActionBuild />
        </IconButton>
        <Dialog
          title="Edit Parent Node"
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            // onError={errors => console.log(errors)}
          >
            <TextValidator
              name="parentLabel"
              value={this.state.parentLabel}
              onChange={this.handleChange}
              hintText="Parent Label"
              validators={['required']}
              errorMessages={['Please enter a label for the parent.']}
            />
            <br />
            <SelectValidator
              name="parentQuantity"
              floatingLabelText="How many child nodes?"
              value={this.state.parentQuantity}
              onChange={this.handleChange}
              autoWidth={true}
              validators={['required']}
              errorMessages={['Please select the number of child nodes.']}
            >
              {numChildItems}
            </SelectValidator>
            <br />
            <TextValidator
              name="parentLower"
              value={this.state.parentLower}
              onChange={this.handleChange}
              hintText="0"
              floatingLabelText="Child node min value"
              floatingLabelFixed={true}
              validators={['required', 'matchRegexp:^[0-9]+$']}
              errorMessages={['Please enter a valid integer.', 'Please enter a valid integer.']}
            />&nbsp;
            <TextValidator
              name="parentUpper"
              value={this.state.parentUpper}
              onChange={this.handleChange}
              hintText="1000"
              floatingLabelText="Child node max value"
              floatingLabelFixed={true}
              validators={['required', 'matchRegexp:^[0-9]+$']}
              errorMessages={['Please enter a valid integer.', 'Please enter a valid integer.']}
            />
            <div className="dialog-buttons-wrap">
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
              />&nbsp;&nbsp;
              <FlatButton
                label="Add"
                primary={true}
                keyboardFocused={true}
                type="submit"
              />
            </div>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

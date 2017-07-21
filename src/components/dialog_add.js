import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
// import Divider from 'material-ui/Divider';

const numChildItems = [];
// populate num child nodes select dropdown
const maxChildren = 15;
for (let i = 0; i <= maxChildren; i++)
  numChildItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

export default class DialogAdd extends Component {
  constructor(props) {
    super();

    this.state = {
      open: false,
      parentLabel: '',
      parentLower: '',
      parentUpper: '',
      parentQuantity: '',
      parentChildren: '',
      key: '',
    };
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
    var data = {
      parentLabel: this.state.parentLabel,
      parentLower: this.state.parentLower,
      parentUpper: this.state.parentUpper,
      parentQuantity: this.state.parentQuantity,
      parentChildren: this.generateChildNodes(
        this.state.parentLower,
        this.state.parentUpper,
        this.state.parentQuantity),
    };
    // if this.props.parentNodes is empty, then do not concat
    // if(this.props.parentNodes) { data = this.props.parentNodes.concat(data); }
    this.writeNodeData(data);
    this.setState({
      open: false,
      parentLabel: '',
      parentLower: '',
      parentUpper: '',
      parentQuantity: '',
      parentChildren: '',
      key: '',
    });
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
    // generate unique key
    var newPostKey = firebase.database().ref().child('nodes').push().key;
    data.key = newPostKey;
    firebase.database().ref('nodes/' + newPostKey).set(data);
  }

  render() {
    const actions = [

    ];

    return (
      <div>
        <RaisedButton label="+ Parent" onTouchTap={this.handleOpen} />
        <Dialog
          title="Add a Parent Node"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            // onError={errors => console.log(errors)}
            instantValidate={true}
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
            <div>
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
              />
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

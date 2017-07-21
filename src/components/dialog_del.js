import React, { Component } from 'react';
import * as firebase from 'firebase';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import ActionDelete from 'material-ui/svg-icons/action/delete';

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

export default class DialogDel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      snackbarOpen: false,
      parentLabel: this.props.parentData.parentLabel,
      parentLower: this.props.parentData.parentLower,
      parentUpper: this.props.parentData.parentUpper,
      parentQuantity: this.props.parentData.parentQuantity,
      parentChildren: this.props.parentData.parentChildren,
      key: this.props.parentData.key,
    }
  }

  handleOpen = () => { this.setState({ open: true }); };
  handleClose = () => { this.setState({ open: false }); };

  handleSubmit = () => {
    this.removeNodeData(this.state.key);

    this.handleClose();
    this.handleSnackbarOpen();
  }

  handleSnackbarOpen = () => { this.setState({ snackbarOpen: true }); }
  handleSnackbarClose = () => { this.setState({ snackbarOpen: false }); }

  removeNodeData(key) {
    var location = 'nodes/' + key;
    firebase.database().ref(location).remove();
  }

  render() {
    return(
      <div className="dialog-del">
        <IconButton
          tooltip="Delete"
          tooltipPosition="bottom-center"
          onTouchTap={this.handleOpen}
          iconStyle={iconStyles.tinyIcon}
          style={iconStyles.tiny}
        >
          <ActionDelete />
        </IconButton>
        <Dialog
          title="Delete Parent Node"
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Are you sure you want to delete this parent node?</p>
          <div className="dialog-buttons-wrap">
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleClose}
            />&nbsp;&nbsp;
            <FlatButton
              label="Delete"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleSubmit}
            />
          </div>
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Parent node removed"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

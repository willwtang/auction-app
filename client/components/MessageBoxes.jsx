import React, { Component, PropTypes } from 'react';
import MessageBox from './MessageBox.jsx'
import { connect } from 'react-redux';
import { checkAuthentication } from '../actions.js';

// console.log('checkAuthentication', checkAuthentication);

class MessageBoxes extends Component {
  static defaultProps = {
    activeMessages: []
  }

  componentDidMount() {
    // this.props.getUser();
  }

  render() {
    if (this.props.user) {
      return (
        <div className="message-boxes"
             style={{
                'display': 'inline-block',
                'position': 'absolute',
                'bottom': '0px',
                'width': '90%',
                'zIndex': '50'
             }}>
          {this.props.activeMessages.map(receiver => <MessageBox userId={this.props.user.id} name={this.props.user.name} receiver={receiver.id} receiverName={receiver.name} />)}
        </div>
      );
    }
    return null;
  }
  
}

var mapStateToProps = function(state, ownProps) {
  return {
    activeMessages: state.messages.active,
    user: state.user
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    getUser: checkAuthentication(dispatch)
  }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(MessageBoxes);

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {reduxForm} from 'redux-form';
import $ from 'jquery';
import { checkAuthentication } from '../actions.js';
import { connect } from 'react-redux';
import FacebookButton from './FacebookButton.jsx';

// look up documentation for redux-form for more insight on how this works
class SellItem extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {fields: {itemTitle, itemDescription, itemDuration, itemPicture, itemStartingBid}, handleSubmit, resetForm} = this.props;
    const postItem = () => {
      // sending post request with all of the necessary fields
      $.post('/sellItem', {
        title: this.props.fields.itemTitle.value,
        description: this.props.fields.itemDescription.value,
        duration: this.props.fields.itemDuration.value,
        picture: this.props.fields.itemPicture.value,
        seller_id: this.seller_id,
        currentBid: this.props.fields.itemStartingBid.value
      });
      resetForm();
    };
    if (!this.props.user) {
      return <FacebookButton />
    }
    return (
      <form onSubmit={handleSubmit(postItem)}>
        <div>
          <label>Title: </label>
          <input type="text" placeholder="What would you like the title to be?" {...itemTitle}/>
        </div>
        <div>
          <label>Description: </label>
          <input type="text" placeholder="How would you describe your item?" {...itemDescription}/>
        </div>
        <div>
          <label>Duration (in days): </label>
          <input type="number" placeholder="How long would you like your item to be on the market?" {...itemDuration}/>
        </div>
        <div>
          <label>Starting Bid: </label>
          <input type="number" placeholder="What would you like your starting bid to be?" {...itemStartingBid}/>
        </div>
        <div>
          <label>Picture: </label>
          <input type="url" placeholder="Place a picture URL here" {...itemPicture}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    getUser: checkAuthentication(dispatch)
  }
};

var mapStateToProps = function(state, ownProps) {
  return {
    user: state.user
  };
};
// essentially a reducer for the form
SellItem = reduxForm({
  // a unique name for this form
  form: 'sellItem',
  // all the fields in your form
  fields: ['itemTitle', 'itemDescription', 'itemDuration', 'itemPicture', 'itemStartingBid']
})(SellItem);

module.exports = connect(mapStateToProps, mapDispatchToProps)(SellItem);


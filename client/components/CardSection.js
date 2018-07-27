import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement />
        <PostalCodeElement
      </label>
    );
  }
}

export default CardSection;
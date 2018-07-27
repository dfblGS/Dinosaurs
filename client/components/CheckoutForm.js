import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
  	event.preventDefault()
  	//Invalid API key, make sure they're working
  	let {token} = await this.props.stripe.createToken({customer: "Yunanee"});
  	console.log(token)
  	let response = await axios.post("/api/charge", token);

  	if (response.ok) {
  		console.log("Completed purchase")
  	}
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
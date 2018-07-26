import React, {Component} from 'react'
import {injectStripe, CardElement, AddressElement} from 'react-stripe-elements'

class CheckoutForm extends Component {
	handleSubmit = event => {
		event.preventDefault()
		this.props.stripe.createToken({type: 'card', name: 'Toomi Yuna'})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label> Card details <CardElement style={{base: {fontSize: '18px'}}} /> </label>
				<button>Confirm order</button>
			</form>
		)
	}
}

export default injectStripe(CheckoutForm)
import React, {Component} from 'react'
import {injectStripe} from 'react-stripe-elements'
import CardSection from './CardSection'

class CheckoutForm extends Component {
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.stripe.createToken({type: 'card', name: 'Toomi Yuna'})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<CardSection />
				<button>Confirm order</button>
			</form>
		)
	}
}

export default injectStripe(CheckoutForm)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, checkout} from '../store/cartReducer'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements'

export class Cart extends Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleRemove(dinosaur) {
    this.props.removeFromCart(dinosaur)
  }

  handleCheckout() {
    this.props.checkout()
  }

	render() {
		const {cart} = this.props
		return (
			<div>
				{cart.map(dinosaur => {
					return (
						<ul key={dinosaur.id}>
							<h2>{dinosaur.name}</h2>
							<h1>{dinosaur.price}</h1>
							<h1>{dinosaur.image}</h1>
							<button
								onClick={() => {
									this.handleRemove(dinosaur)
								}}
							>
								Remove From Cart
							</button>
						</ul>
					)
				})}
				<Elements>
					<CheckoutForm />
				</Elements>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  removeFromCart: dinosaur => dispatch(removeFromCart(dinosaur)),
  checkout: () => dispatch(checkout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

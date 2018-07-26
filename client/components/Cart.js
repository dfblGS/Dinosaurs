import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, checkout} from '../store/cartReducer'
const fakeData = [
	{
		id: 1,
		name: 't-rex',
		price: 5,
		description: 'this is a description',
		image:
			'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'
	},
	{
		id: 2,
		name: 'raptor',
		price: 5,
		description: 'this is a description',
		image:
			'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MonolophosaurusHiRes_usl6ti.jpg'
	}
]

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
		return (
			<div>
				{fakeData.map(dinosaur => {
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
				<button
					onClick={() => {
						this.handleCheckout()
					}}
				>
					Checkout
				</button>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart)

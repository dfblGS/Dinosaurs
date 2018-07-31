import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../store/cartReducer'
require('../../public/style.css')

export class Receipt extends Component {
	constructor(props) {
		super(props)
		this.handleCheckout = this.handleCheckout.bind(this)
		this.state = {
			cart: []
		}
	}

	async componentDidMount() {
		this.setState({cart: await this.props.cart})
		this.handleCheckout()
		localStorage.clear()
	}

	handleCheckout() {
		this.props.checkout()
	}

	render() {
		const cart = this.state.cart
		let total = 0
		return (
			<div>
				<div>
					<h2>Purchase complete! Here is your order confirmation:</h2>
				</div>
				<div>
					{cart.map(dinosaur => {
						total += dinosaur.price * dinosaur.quantity
						return (
							<ul key={dinosaur.id}>
								<h2>{dinosaur.name}</h2>
								<h1>{((dinosaur.price * dinosaur.quantity)/100).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD'
								})}</h1>
								<img src={dinosaur.image}/>
								<h1>{dinosaur.quantity}</h1>
							</ul>
						)
					})}
					Total cost: 
					{(total / 100).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD'
					})}
					<img className="dancingDino" src="http://gifimage.net/wp-content/uploads/2017/10/dancing-dinosaur-gif-4.gif"/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	cart: state.cart
})

const mapDispatchToProps = dispatch => ({
	checkout: () => dispatch(checkout())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Receipt)

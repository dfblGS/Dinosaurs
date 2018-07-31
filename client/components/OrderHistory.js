import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class OrderHistory extends Component {
	constructor() {
		super()
		this.state = {
			orderHistory: [],
			error: false
		}
	}

	async componentDidMount() {
		try {
			const orderData = await axios.get(
				'/api/order/' + this.props.user.id
			)
			this.setState({orderHistory: orderData.data})
		} catch (error) {this.setState({error: true})}
	}

	render() {
		const orderHistory = this.state.orderHistory
		if (this.state.error) {return(<div>Error. Either we goofed, or you accessed orders from not-the-homepage. (Aye, it should work either way, but this was last minute.)</div>)}
		if (orderHistory.length === 0) {return(<div>Order history is empty. Buy something.</div>)}
		return (
			<div>
				{orderHistory.map(order => {
					return (
						<div>
							{order.userOrder}
							{order.userToken}
						</div>
					)
				})}
			</div>
		)
	}
}

export const mapStateToProps = state => {
	return {
		user: state.user,
		isLoggedIn: !!state.user.id
	}
}

export default connect(mapStateToProps)(OrderHistory)

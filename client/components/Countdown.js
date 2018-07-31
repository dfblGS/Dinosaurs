import React, {Component} from 'react'

export default class Countdown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			returnStr: ''
		}
		this.countdown = this.countdown.bind(this)
	}

	componentDidMount() {
		this.timer = setInterval(() => this.countdown(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	countdown() {
		let deadline = new Date(this.props.expiration).getTime()
		let current = new Date().getTime()
		let expires = deadline - current
		if (expires > 0) {
		let days = Math.floor(expires / (1000 * 60 * 60 * 24))
		let hours = Math.floor(
			(expires % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		let minutes = Math.floor((expires % (1000 * 60 * 60)) / (1000 * 60))
		let seconds = Math.floor((expires % (1000 * 60)) / 1000)
		this.setState({
			returnStr: days +' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds left!'
		}) }
		else {
			this.setState({returnStr: "Expired!"})
		}
	}
	render() {
		return <div>{this.state.returnStr}</div>
	}
}

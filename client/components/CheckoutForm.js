import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      setRedirect: false
    }
  }

  async submit(event) {
    try {
      event.preventDefault()
      let {token} = await this.props.stripe.createToken({name: 'Yunanee@shirojo.com'})
      token.price = this.props.total
      let response = await axios.post('/api/charge', token)

      if (response.status === 200) {
        try {await axios.post('api/order')}
        catch(error) {console.log("Error, charge was successful but couldn't post to history API: ", error)}
        this.setState({setRedirect: true})
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  render() {
    if (this.state.setRedirect) {
      return <Redirect to={'/Receipt'} />
    }
    if (this.props.isLoggedIn) {
      return (
        <div className="checkout">
          <p>
            Would you like to complete the purchase as {this.props.user.email}?
          </p>
          <CardElement />
          <button onClick={this.submit}>Checkout</button>
        </div>
      )
    }
    else {
      return (
        <div className="checkout">
          <p>
            Would you like to complete the purchase as a guest?
          </p>
          <CardElement />
          <button onClick={this.submit}>Checkout</button>
        </div>
      )
    }
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm))

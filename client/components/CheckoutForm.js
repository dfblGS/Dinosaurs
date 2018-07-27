import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import { Redirect } from 'react-router'

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
      let {token} = await this.props.stripe.createToken()
      token.price = 3000
      let response = await axios.post('/api/charge', token)
      console.log(response)
      if (response.status === 200) {
        this.setState({setRedirect: true})
      }
    } catch (error) {
      console.log('Error: ',error)
    }
  }

  render() {
    if (this.state.setRedirect) {return (<Redirect to={'/'} />)}
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)

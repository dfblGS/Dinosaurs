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
    console.log(cart)
    let total = 0
    return (
      <div>
        {cart.map(dinosaur => {
          total += dinosaur.price * dinosaur.quantity
          return (
            <ul key={dinosaur.id}>
              <h2>{dinosaur.name}</h2>
              <img src={dinosaur.imageUrl} height='150' width='150'/>
              <h1>Quantity: {dinosaur.quantity}</h1>
              <h1>
                Total price of {dinosaur.name}'s:{' '}
                {(dinosaur.price * dinosaur.quantity / 100).toLocaleString(
                  'en-US',
                  {style: 'currency', currency: 'USD'}
                )}
              </h1>
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
        <div>
          <h1>
            Your total is:{' '}
            {(total / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </h1>
        </div>
        <Elements>
          <CheckoutForm total={total} />
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

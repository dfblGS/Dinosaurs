import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, checkout, removeFromDb} from '../store/cartReducer'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements'

export class Cart extends Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleRemove(dinosaur) {
    if(this.props.cart.length === 1) window.localStorage.clear()
    const { user } = this.props
    if(user.id){
      this.props.removeFromDb(dinosaur, user.id)
    } else{
      this.props.removeFromCart(dinosaur)
    }
  }

  handleCheckout() {
    this.props.checkout()
  }

  render() {
    const {cart, user} = this.props
    const cartString = JSON.stringify(cart)
    if(!user.id && cart.length !== 0) window.localStorage.setItem('cart', cartString)
    let total = 0
    if (cart.length === 0) {
      return (
        <div> Your cart is empty. </div>
        )
    }
    return (
      <div>
        {cart.map(dinosaur => {
          total += dinosaur.price * dinosaur.quantity
          return (
            <ul key={dinosaur.id}>
              <h2>{dinosaur.name}</h2>
              <img src={dinosaur.imageUrl} height="150" width="150" />
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
          <CheckoutForm total={total} order={this.props.cart}/>
        </Elements>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  removeFromCart: dinosaur => dispatch(removeFromCart(dinosaur)),
  checkout: () => dispatch(checkout()),
  removeFromDb: (dinosaur, userId) => dispatch(removeFromDb(dinosaur, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

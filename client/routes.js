import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import HomePage from './components/HomePage'
import Cart from './components/Cart'
import ReceiptPage from './components/ReceiptPage'
import {
  fetchFromLocalStorage,
  fetchByIdAndUpdateCart
} from './store/cartReducer'
import OrderHistory from './components/OrderHistory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    const cartString = window.localStorage.getItem('cart')
    const cart = JSON.parse(cartString)
    if (cart) this.props.fetchFromLocalStorage(cart)
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} userId={this.props.id} cart={this.props.cart}/>
        <Route path="/signup" component={Signup} userId={this.props.id} cart={this.props.cart}/>
        <Route path="/receipt" component={ReceiptPage} />
        <Route path="/orders" component={OrderHistory} userId={this.props.id}/>
        <Route path="/" component={HomePage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} userId={this.props.id} cart={this.props.cart}/>
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    id: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchFromLocalStorage: dinosaurs =>
      dispatch(fetchFromLocalStorage(dinosaurs)),
    // fetchByIdAndUpdateCart: (id, cart) =>
    //   dispatch(fetchByIdAndUpdateCart(id, cart))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

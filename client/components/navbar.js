import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <Button variant="contained" color="primary" component={Link} to="/">Dinoseller</Button>
    <nav>
      {isLoggedIn ? (
        <div>
          <h3>Welcome {user.email}!</h3>
          {/* The navbar will show these links after you log in */}
          <Button variant="contained" color="primary" component={Link} to="/home">Home</Button>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
          <Button variant="contained" color="primary" component={Link} to="/signup">Signup</Button>
        </div>
      )}
      <div>
        <Button variant="contained" color="primary" component={Link} to="/cart">Your Cart</Button>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
export const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

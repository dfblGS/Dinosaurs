import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    
    <Link to="/"><img className="dinoGif" src="https://giant.gfycat.com/KaleidoscopicClearCoyote.gif"/></Link>
    <nav>
      {isLoggedIn ? (
        <div>
          <h3>Welcome {user.email}!</h3>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/orders">Orders</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="secondary">
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <div>
        <Link to="/cart"><img className="cartPic" src="http://www.iconninja.com/files/572/961/214/shopping-cart-icon.png"/></Link>
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

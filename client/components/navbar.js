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
    
    <Link to="/"><img className="dinoGif" src="https://giant.gfycat.com/KaleidoscopicClearCoyote.gif"/><h1>DinoShopper</h1></Link>
    <nav>
      {isLoggedIn ? (
        <div>
          <h3>Welcome {user.email}!</h3>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
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
      <h7>The DinoShopper® trade mark as well as all trade marks, whether they are figurative or not, and all other marks, trade names, service marks, brand names, business names, illustrations, images, logos which appear on our Products, the Platforms, accessories or packaging, whether registered or not (the "Trade Marks"), are and remain the exclusive property of DinoShopper® and/or its licensors and are protected by applicable trade mark laws, regulations, directives, rules, and treaties around the world. All such rights are reserved </h7>
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

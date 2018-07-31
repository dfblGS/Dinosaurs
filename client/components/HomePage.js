import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart, updateCart, fetchByIdAndUpdateCart, updateCartDb, addCartDb} from '../store/cartReducer'
require('../../public/style.css')
import Button from '@material-ui/core/Button'
import Dinosaurs from './Dinosaurs'


import Countdown from "./Countdown"
import axios from 'axios'

export class HomePage extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchDinosaurs()
    const localStorageS = window.localStorage.getItem('cart')
    const localStorage = JSON.parse(localStorageS)
    console.log(localStorage)
    if(this.props.user.id && localStorage ){
      this.props.fetchByIdAndUpdateCart(this.props.user.id, localStorage)
      window.localStorage.clear()
    }
  }

  handleClick(dinosaur) {
    const { user } = this.props
    if (
      this.props.cart.find(dino => {
        return dino.name === dinosaur.name
      })
    ) {
      if(user.id){
        this.props.updateCartDb(dinosaur, user.id)
      } else{
        this.props.updateCart(dinosaur)
      }
    } else {
      if(user.id){
        this.props.addCartDb(dinosaur, user.id)
      } else{
        this.props.addToCart(dinosaur)
      }
    }
    this.props.history.push('/cart')
  }

  render() {
    const {dinosaurs} = this.props
    return (
      <div>
        {!dinosaurs ? (
          <h1>Loading...</h1>
        ) : (
          <div className='dinosaurs'>
            {
              dinosaurs.map(data => {
                if ((new Date(data.expirationDate).getTime() - new Date().getTime()) > 0) {
                  return (
                    <div className="dinosaur">
                      <ul key={data.id} >
                        <Dinosaurs data={data} />
                        <div> Hurry, time is running out!
                          <Countdown expiration={data.expirationDate} />
                        </div>
                        <Button variant='contained' color="primary"
                          onClick={() => {
                            this.handleClick(data)
                          }}
                        >
                          Add To Cart
                        </Button>
                      </ul>
                    </div>
                  )
                }
              })
          }
          </div>
        )}
        <small className="legal">The DinoShopper® trade mark as well as all trade marks, whether they are figurative or not, and all other marks, trade names, service marks, brand names, business names, illustrations, images, logos which appear on our Products, the Platforms, accessories or packaging, whether registered or not (the "Trade Marks"), are and remain the exclusive property of DinoShopper® and/or its licensors and are protected by applicable trade mark laws, regulations, directives, rules, and treaties around the world. All such rights are reserved</small>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dinosaurs: state.dinosaurs,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchDinosaurs: () => dispatch(fetchDinosaurs()),
  addToCart: dinosaur => dispatch(addToCart(dinosaur)),
  updateCart: dinosaur => dispatch(updateCart(dinosaur)),
  fetchByIdAndUpdateCart: (id, cart) =>
      dispatch(fetchByIdAndUpdateCart(id, cart)),
  updateCartDb: (dinosaur, userId) => dispatch(updateCartDb(dinosaur, userId)),
  addCartDb: (dinosaur, userId) => dispatch(addCartDb(dinosaur, userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

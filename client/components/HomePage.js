import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart, updateCart} from '../store/cartReducer'
require('../../public/style.css')
import Button from '@material-ui/core/Button'
import Dinosaurs from './Dinosaurs'



export class HomePage extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    this.props.fetchDinosaurs()
  }

  handleClick(dinosaur) {
    if (
      this.props.cart.find(dino => {
        return dino.name === dinosaur.name
      })
    ) {
      this.props.updateCart(dinosaur)
    } else {
      this.props.addToCart(dinosaur)
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
              return (
                <ul key={data.id} >
                  <Dinosaurs data={data} />
                  <Button variant='contained' color="primary"
                    onClick={() => {
                      this.handleClick(data)
                    }}
                  >
                    Add To Cart
                  </Button>
                </ul>
              )
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchDinosaurs: () => dispatch(fetchDinosaurs()),
  addToCart: dinosaur => dispatch(addToCart(dinosaur)),
  updateCart: dinosaur => dispatch(updateCart(dinosaur))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

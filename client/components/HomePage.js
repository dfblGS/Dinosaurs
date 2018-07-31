import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart, updateCart} from '../store/cartReducer'
import Button from '@material-ui/core/Button'
import Countdown from "./Countdown"

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
          dinosaurs.map(data => {
            if ((new Date(data.expirationDate).getTime() - new Date().getTime()) > 0) {
            return (
              <ul key={data.id}>
                <img src={data.imageUrl} className="mainPagePicture"/>
                <h1>{data.name}</h1>
                <h2>{(data.price/ 100).toLocaleString(
                  'en-US',
                  {style: 'currency', currency: 'USD'}
                )}</h2>
                <h4>{data.description}</h4>
                <Button variant='contained' color="primary"
                  onClick={() => {
                    this.handleClick(data)
                  }}
                >
                  Add To Cart
                </Button>
                <div> Hurry, time is running out!
                <Countdown expiration={data.expirationDate} />
                </div>
              </ul>
            ) }
          })
        )}
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

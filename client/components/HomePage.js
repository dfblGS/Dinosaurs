import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart, updateCart, fetchByIdAndUpdateCart} from '../store/cartReducer'
import Button from '@material-ui/core/Button'

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
      console.log(window.localStorage)
    }
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
              </ul>
            )
          })
        )}
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
      dispatch(fetchByIdAndUpdateCart(id, cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

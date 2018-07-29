import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart, updateCart} from '../store/cartReducer'
import Button from '@material-ui/core/Button'

export class HomePage extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchDinosaurs()
    // const localStorageArr = []
    // if(Object.keys(this.props.user).length === 0){ //why is it 0 when there is a user logged in?
    //   for (let i = 0; i < localStorage.length; i++){
    //     localStorageArr.push(localStorage.key(i))
    //   }
    //   let sliced = localStorageArr.slice(0, -2)
    //   for (let j = 0; j < sliced.length; j++){
    //     // this.props.updateCart(sliced[j])
    //     if(this.props.cart.find(dino => {
    //       dino.name === sliced[j] ?  this.props.updateCart(dino): null
    //     })
    //   }
    // }
  }

  handleClick(dinosaur) {
      if (
        this.props.cart.find(dino => {
          return dino.name === dinosaur.name
        })
      ) {
        this.props.updateCart(dinosaur)
        if(Object.keys(this.props.user).length === 0){
          window.localStorage.setItem(dinosaur.name, Number(window.localStorage.getItem(dinosaur.name)) + 1)
        }
      } else {
        this.props.addToCart(dinosaur)
        if(Object.keys(this.props.user).length === 0){
          window.localStorage.setItem(dinosaur.name, 1)
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
          dinosaurs.map(data => {
            return (
              <ul key={data.id}>
                <img src={data.imageUrl} />
                <h2>{data.name}</h2>
                <h1>{data.price}</h1>
                <h1>{data.description}</h1>
                <Button variant="contained" color="primary"
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
  updateCart: dinosaur => dispatch(updateCart(dinosaur))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

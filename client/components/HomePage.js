import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDinosaurs} from '../store/dinosaurReducer'
import {addToCart} from '../store/cartReducer'

export class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      added: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    this.props.fetchDinosaurs()

  }

  handleClick(dinosaur) {
    this.props.addToCart(dinosaur)
    this.setState({added: true})
    console.log(this.state.added)
  }

  timedOut(){
    if(this.state.added === true){
      setTimeout(function(){
        this.setState({added: false})
      }, 2000)
    }
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
                {
                  this.state.added === false ? 
                <button
                onClick={() => {
                  this.handleClick(data)
                }}
                >
                Add To Cart
                </button>
                :
                <button onload={this.timedOut()}>
                Added!
                </button>
              }
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchDinosaurs: () => dispatch(fetchDinosaurs()),
  addToCart: dinosaur => dispatch(addToCart(dinosaur))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

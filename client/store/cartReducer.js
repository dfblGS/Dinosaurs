const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT = 'CHECKOUT'

const initialState = []

export const addToCart = dinosaur => ({
  type: ADD_TO_CART,
  dinosaur
})

export const removeFromCart = dinosaur => ({
  type: REMOVE_FROM_CART,
  dinosaur
})

export const checkout = () => ({
  type: CHECKOUT
})

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.dinosaur]
    case REMOVE_FROM_CART:
      let indexOf
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.dinosaur.name) {
          indexOf = i
          break
        }
      }
      return state.filter((element, index) => index !== indexOf)
    case CHECKOUT:
      return initialState
    default:
      return state
  }
}

export default cartReducer

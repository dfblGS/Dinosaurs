const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT = 'CHECKOUT'
const UPDATE_CART = 'UPDATE_CART'

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

export const updateCart = dinosaur => ({
	type: UPDATE_CART,
	dinosaur
})

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      action.dinosaur.quantity = 1;
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
    case UPDATE_CART:
      let newIndex
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.dinosaur.name) {
          newIndex = i
          break
        }
      }
      let newQuantity = state[newIndex].quantity + 1
      action.dinosaur.quantity = newQuantity
      return state.map((dinosaur, index) => {
      	if (index !== newIndex) {return dinosaur;}
      	return {...dinosaur, ...action.dinosaur}
      })
    default:
      return state
  }
}

export default cartReducer

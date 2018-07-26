const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT = 'CHECKOUT'

const initialState = []

export const addToCart = dinosaur => ({
	type: ADD_TO_CART,
	dinosaur
})

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return [...state, action.dinosaur]
		case REMOVE_FROM_CART:
			return state.filter(element => {
				return element.id !== action.dinosaur.id
			})
		case CHECKOUT:
			return initialState
		default:
			return state
	}
}

export default cartReducer
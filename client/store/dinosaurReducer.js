import axios from 'axios'

const GOT_DINOSAURS = 'GOT_DINOSAURS'

const gotDinosaurs = dinosaurs => ({
  type: GOT_DINOSAURS,
  dinosaurs
})

export const fetchDinosaurs = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/dinosaurs') //change later
    dispatch(gotDinosaurs(data))
  } catch (err) {
    console.log(err)
  }
}

const initialState = []

const dinosaursReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DINOSAURS:
      return action.dinosaurs
    default:
      return state
  }
}

export default dinosaursReducer

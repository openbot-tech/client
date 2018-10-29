/* eslint-disable no-switch-case-fall-through */
import { ADD_INDICATORS } from '../actions'

const indicators = (state = { indicators: [], overlays: [] }, action) => {
  switch (action.type) {
    case ADD_INDICATORS: return action.payload
    default:
      return state
  }
}

export default indicators

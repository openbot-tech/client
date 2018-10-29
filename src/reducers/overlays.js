/* eslint-disable no-switch-case-fall-through */

const overlays = (state = [], action) => {
  switch (action.type) {
    case 'ADD_OVERLAYS': return action.payload
    default:
      return state
  }
}

export default overlays

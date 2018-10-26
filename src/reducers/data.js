/* eslint-disable no-switch-case-fall-through */

const data = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DATA': return [
      ...state,
      action.payload,
    ]
    default:
      return state
  }
}

export default data

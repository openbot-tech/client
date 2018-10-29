export const ADD_DATA = 'ADD_DATA'
export const ADD_INDICATORS = 'ADD_INDICATORS'

export const addData = payload => ({
  type: ADD_DATA,
  payload,
})


export const addIndicators = payload => ({
  type: ADD_INDICATORS,
  payload,
})

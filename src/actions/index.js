const ADD_DATA = 'ADD_DATA'
const ADD_OVERLAYS = 'ADD_OVERLAYS'

export const addData = payload => ({
  type: ADD_DATA,
  payload,
})

export const addOverlays = payload => ({
  type: ADD_OVERLAYS,
  payload,
})

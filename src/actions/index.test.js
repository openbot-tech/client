import {
  addData,
  ADD_DATA,
  addIndicators,
  ADD_INDICATORS,
} from '.'

describe('Actions', () => {
  it('Should create an action to add data', () => {
    const mockData = {
      close: 2,
      date: new Date(1540817843 * 1000),
      high: 3,
      low: 4,
      open: 5,
      volume: 6,
      rsi7: 2,
      sma5: 3,
    }
    const expectedAction = {
      type: ADD_DATA,
      payload: mockData,
    }
    expect(addData(mockData)).toEqual(expectedAction)
  })
  it('Should create an action to add indicators', () => {
    const mockData = {
      overlays: [{ type: 'overlay', name: 'sma20' }],
      indicators: [{ type: 'indicator', name: 'rsi7' }],
    }
    const expectedAction = {
      type: ADD_INDICATORS,
      payload: mockData,
    }
    expect(addIndicators(mockData)).toEqual(expectedAction)
  })
})

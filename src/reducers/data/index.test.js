import reducer from '.'
import { ADD_DATA } from '../../actions'

describe('Data reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })
  it('should handle ADD_DATA', () => {
    const initMockData = {
      close: 2,
      date: new Date(1540817843 * 1000),
      high: 3,
      low: 4,
      open: 5,
      volume: 6,
      rsi7: 2,
      sma5: 3,
    }
    expect(
      reducer([], {
        type: ADD_DATA,
        payload: initMockData,
      }),
    ).toEqual([initMockData])

    const secondMockData = {
      close: 3,
      date: new Date(1540817843 * 1000),
      high: 4,
      low: 5,
      open: 6,
      volume: 7,
      rsi7: 3,
      sma5: 4,
    }

    expect(
      reducer(
        [initMockData],
        {
          type: ADD_DATA,
          payload: secondMockData,
        },
      ),
    ).toEqual([
      initMockData,
      secondMockData,
    ])
  })
})

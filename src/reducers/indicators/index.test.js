import reducer from '.'
import { ADD_INDICATORS } from '../../actions'

describe('Data reducer', () => {
  it('should return the initial state', () => {
    const initialState = { indicators: [], overlays: [] }
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle ADD_DATA', () => {
    const initMockData = {
      indicators: [{
        name: 'rsi7',
        stroke: '#000',
        indicator: 'rsi',
        options: [7],
        type: 'indicator',
      }],
      overlays: [{
        name: 'sma5',
        stroke: '#fff',
        indicator: 'sma',
        options: [5],
        type: 'overlay',
      }],
    }

    expect(
      reducer({}, {
        type: ADD_INDICATORS,
        payload: initMockData,
      }),
    ).toEqual(initMockData)

    const secondMockData = {
      indicators: [{
        name: 'cci14',
        stroke: '#555',
        indicator: 'cci',
        options: [14],
        type: 'indicator',
      }],
      overlays: [{
        name: 'obv',
        stroke: '#999',
        indicator: 'obv',
        options: [],
        type: 'indicator',
      }],
    }

    expect(
      reducer(
        initMockData,
        {
          type: ADD_INDICATORS,
          payload: secondMockData,
        },
      ),
    ).toEqual(secondMockData)
  })
})

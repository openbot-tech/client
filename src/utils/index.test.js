import {
  colors,
  getLast,
  parseMarketData,
  getIndicatorsWithType,
  parseIndicators,
  parseIndicatorOptions,
  parseData,
  createChartIndicatorObject,
} from '.'

describe('Utils', () => {
  it('Should return last element in array or undefined', () => {
    expect(getLast([])).toBe(undefined)
    expect(getLast([1, 2])).toBe(2)
    expect(getLast([1])).toBe(1)
  })
  it('Should parse market data', () => {
    const mockData = {
      close: [1, 2],
      date: [1540817813, 1540817843],
      high: [1, 3],
      low: [1, 4],
      open: [1, 5],
      volume: [1, 6],
    }
    const mockIndicators = { sma20: 2 }
    const expected = {
      close: 2,
      date: new Date(1540817843 * 1000),
      high: 3,
      low: 4,
      open: 5,
      volume: 6,
      sma20: 2,
    }
    expect(parseMarketData(mockData, mockIndicators)).toEqual(expected)
  })
  it('Should indicator with defined type', () => {
    const mockIndicators = [{ type: 'overlay' }, { type: 'indicator' }]
    expect(getIndicatorsWithType(mockIndicators, 'overlay')).toEqual([{ type: 'overlay' }])
    expect(getIndicatorsWithType(mockIndicators, 'indicator')).toEqual([{ type: 'indicator' }])
    expect(getIndicatorsWithType(mockIndicators, 'no')).toEqual([])
  })
  it('Should parse indicator data', () => {
    const mockIndicators = [{ indicatorName: 'rsi7', data: [[1, 2]] }, { indicatorName: 'cci14', data: [[1, 3]] }]
    expect(parseIndicators(mockIndicators)).toEqual({ rsi7: 2, cci14: 3 })
  })
  it('Should parse indicator options', () => {
    const mockIndicators = [
      {
        indicatorName: 'rsi7',
        data: [[1, 2]],
        name: 'rsi',
        indicatorOptions: [7],
        type: 'indicator',
      },
      {
        indicatorName: 'sma5',
        data: [[1, 3]],
        name: 'sma',
        indicatorOptions: [5],
        type: 'overlay',
      },
    ]
    const expected = [{
      name: 'rsi7',
      stroke: colors[0],
      indicator: 'rsi',
      options: [7],
      type: 'indicator',
    },
    {
      name: 'sma5',
      stroke: colors[1],
      indicator: 'sma',
      options: [5],
      type: 'overlay',
    }]
    expect(parseIndicatorOptions(mockIndicators)).toEqual(expected)
  })
  it('Should parse data', () => {
    const marketMockData = {
      close: [1, 2],
      date: [1540817813, 1540817843],
      high: [1, 3],
      low: [1, 4],
      open: [1, 5],
      volume: [1, 6],
    }
    const indicatorsMockData = [
      {
        indicatorName: 'rsi7',
        data: [[1, 2]],
        name: 'rsi',
        indicatorOptions: [7],
        type: 'indicator',
      },
      {
        indicatorName: 'sma5',
        data: [[1, 3]],
        name: 'sma',
        indicatorOptions: [5],
        type: 'overlay',
      },
    ]
    const mockData = {
      indicatorData: indicatorsMockData,
      marketData: marketMockData,
    }
    const expected = {
      data: {
        close: 2,
        date: new Date(1540817843 * 1000),
        high: 3,
        low: 4,
        open: 5,
        volume: 6,
        rsi7: 2,
        sma5: 3,
      },
      indicators: [{
        name: 'rsi7',
        stroke: colors[0],
        indicator: 'rsi',
        options: [7],
        type: 'indicator',
      }],
      overlays: [{
        name: 'sma5',
        stroke: colors[1],
        indicator: 'sma',
        options: [5],
        type: 'overlay',
      }],
    }
    expect(parseData(mockData)).toEqual(expected)
  })
  it('Should parse data for chart indicators', () => {
    const mockData = [{ name: 'rsi7', whatevs: null }, { name: 'sma5', shiizz: undefined }]
    const expected = [
      { accessor: expect.any(Function), whatevs: null },
      { accessor: expect.any(Function), shiizz: undefined },
    ]
    expect(createChartIndicatorObject(mockData)).toEqual(expected)
  })
})

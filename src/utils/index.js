import { timeParse } from 'd3-time-format'

export const colors = [
  '#12EAEA',
  '#DB2763',
  '#B0DB43',
  '#BCE7FD',
  '#C492B1',
  '#5E2BFF',
  '#FC6DAB',
]


const parseDate = timeParse('%s')

const translateOutputNames = {
  bbands_lower: 'bottom',
  bbands_middle: 'middle',
  bbands_upper: 'top',
  stoch_k: 'K',
  stoch_d: 'D',
}

export const getLast = arr => [...arr].pop()


export const parseMarketData = (data, indicators = {}, signal = {}) => ({
  close: getLast(data.close),
  date: parseDate(getLast(data.date)),
  high: getLast(data.high),
  low: getLast(data.low),
  open: getLast(data.open),
  volume: getLast(data.volume),
  ...indicators,
  ...signal,
})


export const getIndicatorsWithType = (indicatorData, type) =>
  indicatorData
    .filter(indicator => indicator.type === type)


export const parseIndicatorData = (indicatorData, outputNames) => {
  if (indicatorData.length === 1 && Array.isArray(indicatorData)) return getLast(getLast(indicatorData))
  return outputNames.reduce((acc, outputName, idx) => ({
    ...acc,
    [translateOutputNames[outputName] || outputName]: getLast(indicatorData[idx]),
  }), {})
}

export const parseIndicators = indicatorData =>
  indicatorData
    .reduce((acc, indicator) => ({
      ...acc,
      [indicator.indicatorName]: parseIndicatorData(indicator.data, indicator.output_names),
    }), {})


export const parseIndicatorOptions = indicatorData =>
  indicatorData
    .map((indicator, idx) => ({
      name: indicator.indicatorName,
      stroke: colors[idx],
      indicator: indicator.name,
      options: indicator.indicatorOptions,
      type: indicator.type,
    }))


export const parseData = (data) => {
  const { indicatorData, marketData, signal } = data
  const indicatorsData = parseIndicators(indicatorData)
  const indicatorOptions = parseIndicatorOptions(indicatorData)
  const overlayIndicatorOptions = getIndicatorsWithType(indicatorOptions, 'overlay')
  const chartIndicatorOptions = getIndicatorsWithType(indicatorOptions, 'indicator')
  const dataWithIndicators = parseMarketData(marketData, indicatorsData, { signal })
  return { data: dataWithIndicators, overlays: overlayIndicatorOptions, indicators: chartIndicatorOptions }
}

export const createChartIndicatorObject = arr => arr.map(({ name, ...options }) =>
  ({ accessor: data => data && data[name], ...options }))

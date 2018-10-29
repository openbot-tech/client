import { timeParse } from 'd3-time-format'

const colors = [
  '#12EAEA',
  '#DB2763',
  '#B0DB43',
  '#BCE7FD',
  '#C492B1',
]


const parseDate = timeParse('%s')


export const getLast = arr => [...arr].pop()


export const parseMarketData = (data, indicators = {}) => ({
  close: getLast(data.close),
  date: parseDate(getLast(data.date)),
  high: getLast(data.high),
  low: getLast(data.low),
  open: getLast(data.open),
  volume: getLast(data.volume),
  ...indicators,
})


export const getIndicatorsWithType = (indicatorData, type) =>
  indicatorData
    .filter(indicator => indicator.type === type)


export const parseIndicators = indicatorData =>
  indicatorData
    .reduce((acc, indicator) => ({
      ...acc,
      [indicator.indicatorName]: getLast(getLast(indicator.data)), // TODO FIX
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
  const indicatorsData = parseIndicators(data.indicatorData)
  const indicatorOptions = parseIndicatorOptions(data.indicatorData)
  const overlayIndicatorOptions = getIndicatorsWithType(indicatorOptions, 'overlay')
  const chartIndicatorOptions = getIndicatorsWithType(indicatorOptions, 'indicator')
  const dataWithIndicators = parseMarketData(data.marketData, indicatorsData)
  return { data: dataWithIndicators, overlays: overlayIndicatorOptions, indicators: chartIndicatorOptions }
}

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

export const parseMarketData = (data, overlayIndicators = {}) => ({
  close: getLast(data.close),
  date: parseDate(getLast(data.date)),
  high: getLast(data.high),
  low: getLast(data.low),
  open: getLast(data.open),
  volume: getLast(data.volume),
  ...overlayIndicators,
})

export const getOverlayIndicators = indicatorData =>
  indicatorData
    .filter(indicator => indicator.type === 'overlay')


export const parseOverlayIndicatorData = indicatorData =>
  getOverlayIndicators(indicatorData)
    .reduce((acc, indicator) => ({
      ...acc,
      [indicator.indicatorName]: getLast(getLast(indicator.data)), // TODO FIX
    }), {})


export const parseOverlayIndicatorOptions = indicatorData =>
  getOverlayIndicators(indicatorData)
    .map((indicator, idx) => ({
      name: indicator.indicatorName,
      stroke: colors[idx],
      indicator: indicator.name,
      options: indicator.indicatorOptions,
    }))


export const parseData = (data) => {
  const overlayIndicatorsData = parseOverlayIndicatorData(data.indicatorData)
  const overlayIndicators = parseOverlayIndicatorOptions(data.indicatorData)
  const dataWithIndicators = parseMarketData(data.marketData, overlayIndicatorsData)
  return { data: dataWithIndicators, overlays: overlayIndicators }
}

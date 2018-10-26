import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Q')

export const getLast = arr => [...arr].pop()

export const parseMarketData = data => ({
  close: getLast(data.close),
  date: parseDate(getLast(data.date)),
  high: getLast(data.high),
  low: getLast(data.low),
  open: getLast(data.open),
  volume: getLast(data.volume),
})

import { tsvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'

const parseData = parse =>
  (data) => {
    const updatedData = {}
    updatedData.date = parse(data.date)
    updatedData.open = +data.open
    updatedData.high = +data.high
    updatedData.low = +data.low
    updatedData.close = +data.close
    updatedData.volume = +data.volume

    return updatedData
  }

const parseDate = timeParse('%Y-%m-%d')

export const getData = () => {
  const promiseMSFT = fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv')
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)))
  return promiseMSFT
}

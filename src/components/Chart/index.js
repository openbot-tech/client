
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import {
  CandlestickSeries,
  LineSeries,
} from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  OHLCTooltip,
  MovingAverageTooltip,
} from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import {
  Label,
} from 'react-stockcharts/lib/annotation'
import { last } from 'react-stockcharts/lib/utils'

// eslint-disable-next-line react/prefer-stateless-function
class MovingAverageCrossOverAlgorithmV1 extends Component {
  render() {
    const { type, data: initialData, width, ratio } = this.props

    const ema100 = {
      calculate: data => data.map(obj => ({ ...obj, ema100: 250 })),
      accessor: data => data && data.ema100,
    }

    const margin = { left: 80, right: 80, top: 30, bottom: 50 }
    const height = 400

    const [yAxisLabelX, yAxisLabelY] =
      [width - margin.left - 40, margin.top + (height - margin.top - margin.bottom) / 2]

    const calculatedData = ema100.calculate(initialData)
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData)

    const start = xAccessor(last(data))
    const end = xAccessor(data[Math.max(0, data.length - 150)])
    const xExtents = [start, end]

    return (
      <ChartCanvas
        height={height}
        width={width}
        ratio={ratio}
        margin={margin}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], ema100.accessor]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />

          <Label
            x={(width - margin.left - margin.right) / 2}
            y={height - 45}
            fontSize="12"
            text="XAxis Label here"
          />

          <YAxis axisAt="right" orient="right" ticks={5} />

          <Label
            x={yAxisLabelX}
            y={yAxisLabelY}
            rotate={-90}
            fontSize="12"
            text="YAxis Label here"
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />

          <CandlestickSeries />
          <LineSeries yAccessor={ema100.accessor} stroke="#000" />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={[
              {
                yAccessor: ema100.accessor,
                type: 'EMA',
                stroke: '#000',
                windowSize: 7,
              },
            ]}
          />

        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}

MovingAverageCrossOverAlgorithmV1.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']),
}

MovingAverageCrossOverAlgorithmV1.defaultProps = {
  type: 'hybrid',
}

const MovingAverageCrossOverAlgorithmV1Width = fitWidth(MovingAverageCrossOverAlgorithmV1)

export default MovingAverageCrossOverAlgorithmV1Width

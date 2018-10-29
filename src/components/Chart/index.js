
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
  SingleValueTooltip,
} from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'
import { createChartIndicatorObject } from '../../utils'
import Overlays from './overlay'
// eslint-disable-next-line react/prefer-stateless-function
class MovingAverageCrossOverAlgorithmV1 extends Component {
  render() {
    const { type, data: initialData, width, ratio, overlays, indicators } = this.props

    const indicatorOverlayOptions = createChartIndicatorObject(overlays)
    const indicatorsOptions = createChartIndicatorObject(indicators)

    const margin = { left: 80, right: 80, top: 30, bottom: 50 }
    const height = 310 + (indicators.length * 180)

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData)

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
          height={300}
          yExtents={[d => [d.high, d.low, ...indicatorOverlayOptions]]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />

          <YAxis axisAt="right" orient="right" ticks={5} />

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
          <Overlays indicatorOverlays={indicatorOverlayOptions} />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />

          <OHLCTooltip origin={[-40, 0]} />
        </Chart>

        { indicatorsOptions.length > 0 && indicatorsOptions.map((indicator, idx) => {
          const xAxisProps = idx === indicatorsOptions.length - 1
            ? {}
            : { showTicks: false, outerTickSize: 0 }
          return (
            <Chart
              key={`${indicator.indicator}${indicator.options.join('')}`}
              id={idx + 2}
              yExtents={indicator.accessor}
              height={150}
              origin={[0, idx === 0 ? 300 : ((idx * 150) + 300)]}
              padding={{ top: 10, bottom: 20 }}
            >
              <XAxis
                axisAt="bottom"
                orient="bottom"
                {...xAxisProps}
              />
              <YAxis axisAt="right" orient="right" ticks={5} />

              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format('.2f')}
              />

              <LineSeries yAccessor={indicator.accessor} stroke={indicator.stroke} />
              <SingleValueTooltip
                yAccessor={indicator.accessor}
                yLabel={`${indicator.indicator} (${indicator.options.join(', ')})`}
                yDisplayFormat={format('.2f')}
                origin={[-40, 15]}
              />
            </Chart>
          )
        })
        }

        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}

MovingAverageCrossOverAlgorithmV1.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  overlays: PropTypes.array.isRequired, // eslint-disable-line
  indicators: PropTypes.array.isRequired, // eslint-disable-line
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']),
}

MovingAverageCrossOverAlgorithmV1.defaultProps = {
  type: 'hybrid',
}

const MovingAverageCrossOverAlgorithmV1Width = fitWidth(MovingAverageCrossOverAlgorithmV1)

export default MovingAverageCrossOverAlgorithmV1Width

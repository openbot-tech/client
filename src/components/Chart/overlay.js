import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { LineSeries, BollingerSeries } from 'react-stockcharts/lib/series'
import { MovingAverageTooltip, BollingerBandTooltip } from 'react-stockcharts/lib/tooltip'

const BBANDS_FILL = '#4682B4'

const getLineComponent = overlay => (
  overlay.indicator === 'bbands'
    ? (
      <BollingerSeries
        key={`${overlay.indicator}${overlay.options.join('')}`}
        yAccessor={overlay.accessor}
        stroke={overlay.stroke}
        fill={BBANDS_FILL}
      />
    )
    : (
      <LineSeries
        key={`${overlay.indicator}${overlay.options.join('')}`}
        yAccessor={overlay.accessor}
        stroke={overlay.stroke}
      />
    )
)


const getTooltipComponent = (indicatorOverlays) => {
  const indicatorOverlaysWithoutBB = indicatorOverlays.filter(overlay => overlay.indicator === 'bbands')
  const bbandsIndicator = indicatorOverlays.find(overlay => overlay.indicator === 'bbands')
  return (
    <Fragment>
      {
        indicatorOverlaysWithoutBB.length > 0 && (
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            displayFormat={format('.6f')}
            options={indicatorOverlays.map(overlay => ({
              key: overlay.name,
              yAccessor: overlay.accessor,
              type: overlay.indicator,
              stroke: overlay.stroke,
              windowSize: overlay.options[0], // TODO this should be more dynamic
            }))
            }
          />
        )
      }
      {
        bbandsIndicator && (
          <BollingerBandTooltip
            origin={[-38, 60]}
            yAccessor={bbandsIndicator.accessor}
            options={{
              windowSize: bbandsIndicator.options[0],
              multiplier: bbandsIndicator.options[1],
              sourcePath: 'close',
              movingAverageType: 'sma',
            }}
          />
        )}
    </Fragment>
  )
}

const Overlays = ({ indicatorOverlays }) => (
  <Fragment>
    {
      indicatorOverlays.map(overlay => getLineComponent(overlay))
    }
    {
      getTooltipComponent(indicatorOverlays)
    }
  </Fragment>
)

Overlays.propTypes = {
  indicatorOverlays: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    stroke: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
}

export default Overlays

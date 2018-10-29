import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { LineSeries } from 'react-stockcharts/lib/series'
import { MovingAverageTooltip } from 'react-stockcharts/lib/tooltip'

const Overlays = ({ indicatorOverlays }) => (
  <Fragment>
    {
      indicatorOverlays.map(overlay =>
        <LineSeries key={overlay.name} yAccessor={overlay.accessor} stroke={overlay.stroke} />)
    }
    {
      indicatorOverlays.length > 0 && (
        <MovingAverageTooltip
          onClick={e => console.log(e)}
          origin={[-38, 15]}
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
  </Fragment>
)

Overlays.propTypes = {
  indicatorOverlays: PropTypes.array.isRequired, // eslint-disable-line
}

export default Overlays
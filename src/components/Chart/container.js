import React from 'react'
import { connect } from 'react-redux'
import Chart from '.'

const ChartContainer = props => <Chart {...props} />

const mapStateToProps = state => ({
  data: state.data,
  overlays: state.overlays,
})

export default connect(
  mapStateToProps,
)(ChartContainer)

import React from 'react'
import { connect } from 'react-redux'
import Chart from '.'

const ChartContainer = props => <Chart {...props} />

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(
  mapStateToProps,
)(ChartContainer)

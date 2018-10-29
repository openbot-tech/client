import React from 'react'
import { connect } from 'react-redux'
import {
  addData as addDataAction,
  addIndicators as addIndicatorsAction,
} from '../../actions'
import App from '.'

const AppContainer = props => <App {...props} />

const mapStateToProps = state => ({
  data: state.data,
})

const mapDispatchToProps = dispatch => ({
  addData: data => dispatch(addDataAction(data)),
  addIndicators: data => dispatch(addIndicatorsAction(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer)

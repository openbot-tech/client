import React from 'react'
import { connect } from 'react-redux'
import { addData as addDataAction, addOverlays as AddOverlaysAction } from '../../actions'
import App from '.'

const AppContainer = props => <App {...props} />

const mapStateToProps = state => ({
  data: state.data,
})

const mapDispatchToProps = dispatch => ({
  addOverlays: overlays => dispatch(AddOverlaysAction(overlays)),
  addData: data => dispatch(addDataAction(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer)

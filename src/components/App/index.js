
import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import Chart from '../Chart/container'
import { parseData } from '../../utils'

const client = io.connect('http://localhost:1337')

class App extends React.Component {
  componentDidMount() {
    const { addData, addOverlays } = this.props
    client.on('data', (msg) => {
      const { data, overlays } = parseData(msg)
      addOverlays(overlays)
      addData(data)
    })
  }

  render() {
    const { data } = this.props
    if (data.length < 2) {
      return <div>Loading...</div>
    }
    return (
      <Chart type="hybrid" />
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  addData: PropTypes.func.isRequired,
  addOverlays: PropTypes.func.isRequired,
}

export default App


import React from 'react'
import PropTypes from 'prop-types'
// import io from 'socket.io-client'
import Chart from '../Chart/container'
import { getData } from '../../utils'

// const client = io.connect('http://localhost:1337')

class App extends React.Component {
  componentDidMount() {
    const { addData } = this.props
    // client.on('data', msg => console.info('hey', msg))
    getData().then((data) => {
      addData(data)
    })
  }

  render() {
    const { data } = this.props
    if (data.length === 0) {
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
}

export default App

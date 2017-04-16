import h from 'helix-react/lib/html'

import {Component} from 'react'

export default class GoogleMap extends Component<any, any> {
  componentDidMount () {
    this.renderMap()
  }
  renderMap () {
    navigator.geolocation.getCurrentPosition((position) => {
      const map = new google.maps.Map(this.refs.map as Element, {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 14,
      })
      this.props.onMapCreated(map)
    })
  }
  render () {
    return (
      <div
        ref='map'
        className='h-100 w-100'
      />
    )
  }
}

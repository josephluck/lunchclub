import h from 'helix-react/lib/html'

import {Component} from 'react'

export default class GoogleMap extends Component<any, any> {
  constructor (props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }
  shouldComponentUpdate () {
    return false
  }
  renderMap (node) {
    const map = new google.maps.Map(node as Element, {
      center: {lat: 0, lng: 0},
      zoom: 14,
    })
    if (!this.props.map) {
      this.props.onMapCreated(map)
    }
  }
  render () {
    return (
      <div
        ref={this.renderMap}
        className='h-100 w-100'
      />
    )
  }
}

import h from 'helix-react/lib/html'
import {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


export default class MyGoogleMap extends Component<any, any> {
  shouldComponentUpdate (props) {
    if (props.pure) {
      return false
    }
    const markersChanged = props.markers.length && this.props.markers.length && props.markers[0].position.lat !== this.props.markers[0].position.lat
    const locChanged = props.loc.lat !== this.props.loc.lat
    const zoomChanged = props.zoom !== this.props.zoom
    return markersChanged || locChanged || zoomChanged
  }
  render () {
    const MadeMap = withGoogleMap(() => {
      return (
        <GoogleMap
          defaultZoom={this.props.zoom || 8}
          defaultCenter={this.props.loc}
        >
          {this.props.markers.map(marker => {
            return (
              <Marker
                {...marker}
              />
            )
          })}
        </GoogleMap>
      )
    })
    return (
      <MadeMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    )
  }
}

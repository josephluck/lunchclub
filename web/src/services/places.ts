interface Request {
  lat: number
  lng: number
  query: string
}

const radius = 20000

export default function (maps) {
  return {
    nearby (map, request) {
      const googleMaps = maps()
      const service = new google.maps.places.PlacesService(map)
      return new Promise(resolve => {
        service.nearbySearch({
          location: new googleMaps.LatLng(request.lat, request.lng),
          radius,
          type: 'restaurant',
        }, resolve)
      })
    },
    text (map, request: Request) {
      const googleMaps = maps()
      const service = new googleMaps.places.PlacesService(map) as google.maps.places.PlacesService
      return new Promise(resolve => {
        service.textSearch({
          location: new googleMaps.LatLng(request.lat, request.lng),
          radius,
          query: request.query,
          type: 'restaurant',
        }, resolve)
      })
    }
  }
}

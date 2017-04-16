import places from '../services/places'

export default function () {
  return {
    places: places(() => google.maps),
  }
}

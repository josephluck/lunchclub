import places from '../services/places'
import firebase from '../services/firebase'

export default function () {
  return {
    places: places(() => google.maps),
    api: firebase,
  }
}

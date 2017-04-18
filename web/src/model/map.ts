import * as debounce from 'debounce-promise'
import * as moment from 'moment'
import {Models} from './'

export interface State {
  map: google.maps.Map
  query: string
  places: any[]
  times: moment.Moment[]
}

export interface Reducers {
  setQuery: Helix.Reducer<Models, State, string>
  setPlaces: Helix.Reducer<Models, State, any[]>
  setMap: Helix.Reducer<Models, State, any>
}

export interface Effects {
  search: Helix.Effect<Models, string>
  getNearbyPlaces: Helix.Effect0<Models>
  searchPlaces: Helix.Effect<Models, string>
  goToPlace: Helix.Effect<Models, any>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'googleMap'
export interface Namespace { 'googleMap': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

let markers = []

export function model ({
  places,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      map: null,
      query: '',
      places: [],
      times: createTimes(),
    },
    reducers: {
      setQuery (state, query) {
        return {query}
      },
      setPlaces (state, places) {
        return {places}
      },
      setMap (state, map) {
        return {map}
      },
    },
    effects: {
      search (state, actions, query) {
        actions[namespace].setQuery(query)
        return actions[namespace].searchPlaces(query)
      },
      getNearbyPlaces (state, actions) {
        const map = state[namespace].map
        return places.nearby(map, {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng(),
        }).then(places => {
          actions[namespace].setPlaces(places)
          let bounds = addMarkersToMap(map, places)
          centerMap(map, bounds)
        })
      },
      searchPlaces: debounce((state, actions, query) => {
        const map = state[namespace].map
        return places.text(map, {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng(),
          query,
        }).then(places => {
          actions[namespace].setPlaces(places)
          let bounds = addMarkersToMap(map, places)
          centerMap(map, bounds)
        })
      }, 1000),
      goToPlace (state, actions, place) {
        const map = state.googleMap.map
        markers.forEach(marker => {
          marker.setMap(null)
        })
        const position = new google.maps.LatLng(place.lat, place.lng)
        map.panTo(position)
        map.setCenter(position)
        const marker = new google.maps.Marker({
          position,
          animation: google.maps.Animation.DROP,
          map,
          title: place.name,
        })
        markers.push(marker)
      },
    },
  }
}

function centerMap (map: google.maps.Map, bounds) {
  map.fitBounds(bounds)
  map.panToBounds(bounds)
  if (map.getZoom() > 15) {
    map.setZoom(15)
  }
}

function addMarkersToMap (map: google.maps.Map, places: google.maps.places.PlaceResult[]) {
  let bounds = new google.maps.LatLngBounds()
  markers.forEach(marker => {
    marker.setMap(null)
  })
  places.forEach(place => {
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      map,
      title: place.name,
    })
    markers.push(marker)
    const loc = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng())
    bounds.extend(loc)
  })
  return bounds
}

function createTimes (): moment.Moment[] {
  let endTime = moment().add(1, 'days').startOf('day')
  let timeStops = []
  let startTime = moment().add('m', 15 - moment().minute() % 15)

  while (startTime <= endTime) {
    timeStops.push(moment(startTime))
    startTime.add('m', 15)
  }

  return timeStops
}

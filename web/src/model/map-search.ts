import * as debounce from 'debounce-promise'
import {Models} from './'

export interface State {
  map: any
  query: string
  places: any[]
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
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'map-search'
export interface Namespace { 'map-search': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model ({
  places,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      map: null,
      query: '',
      places: [],
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
    },
  }
}

function centerMap (map: google.maps.Map, bounds) {
  map.fitBounds(bounds)
  map.panToBounds(bounds)
}

let markers = []
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

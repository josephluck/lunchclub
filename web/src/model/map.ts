import * as debounce from 'debounce-promise'
import * as moment from 'moment'
import {Models} from './'

export interface State {
  query: string
  usersLoc: any
  places: any[]
  times: moment.Moment[]
}

export interface Reducers {
  setUsersLoc: Helix.Reducer<Models, State, any>
  setQuery: Helix.Reducer<Models, State, string>
  setPlaces: Helix.Reducer<Models, State, any[]>
}

export interface Effects {
  search: Helix.Effect<Models, string>
  getUsersLoc: Helix.Effect0<Models>
  getNearbyPlaces: Helix.Effect0<Models>
  searchPlaces: Helix.Effect<Models, string>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'googleMap'
export interface Namespace { 'googleMap': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model ({
  places,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      query: '',
      places: [],
      times: createTimes(),
    },
    reducers: {
      setUsersLoc (state, usersLoc) {
        return {usersLoc}
      },
      setQuery (state, query) {
        return {query}
      },
      setPlaces (state, places) {
        return {places}
      },
    },
    effects: {
      getUsersLoc (state, actions) {
        return new Promise(resolve => {
          window.navigator.geolocation.getCurrentPosition(position => {
            actions.googleMap.setUsersLoc({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
            resolve()
          })
        })
      },
      search (state, actions, query) {
        actions[namespace].setQuery(query)
        return actions[namespace].searchPlaces(query)
      },
      getNearbyPlaces (state, actions) {
        return places.nearby(document.createElement('div'), state.googleMap.usersLoc).then(places => {
          actions[namespace].setPlaces(places)
        })
      },
      searchPlaces: debounce((state, actions, query) => {
        return places.text(document.createElement('div'), {
          ...state.googleMap.usersLoc,
          query,
        }).then(places => {
          actions[namespace].setPlaces(places)
        })
      }, 1000),
    },
  }
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

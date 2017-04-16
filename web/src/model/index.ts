import * as Login from './login'
import * as Lunch from './lunch'
import * as Authentication from './authentication'
import * as MapSearch from './map-search'
import deps from './dependencies'

const dependencies = deps()

export type Models = Helix.Models<
  Login.Namespace &
  Lunch.Namespace &
  Authentication.Namespace &
  MapSearch.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
>

export default function () {
  return {
    state: {},
    reducers: {},
    effects: {},
    models: {
      [Login.namespace]: Login.model(),
      [Lunch.namespace]: Lunch.model(),
      [Authentication.namespace]: Authentication.model(),
      [MapSearch.namespace]: MapSearch.model(dependencies),
    },
  }
}

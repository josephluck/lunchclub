import * as Lunch from './lunch'
import * as Authentication from './authentication'
import * as MapSearch from './map-search'
import deps from './dependencies'

const dependencies = deps()

export type Models = Helix.Models<
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
      [Lunch.namespace]: Lunch.model(dependencies),
      [Authentication.namespace]: Authentication.model(dependencies),
      [MapSearch.namespace]: MapSearch.model(dependencies),
    },
  }
}

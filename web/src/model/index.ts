import * as Lunch from './lunch'
import * as Users from './users'
import * as Authentication from './authentication'
import * as GoogleMap from './map'
import deps from './dependencies'

const dependencies = deps()

export type Models = Helix.Models<
  Lunch.Namespace &
  Users.Namespace &
  Authentication.Namespace &
  GoogleMap.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
>

export default function () {
  return {
    state: {},
    reducers: {},
    effects: {},
    models: {
      [Lunch.namespace]: Lunch.model(dependencies),
      [Users.namespace]: Users.model(dependencies),
      [Authentication.namespace]: Authentication.model(dependencies),
      [GoogleMap.namespace]: GoogleMap.model(dependencies),
    },
  }
}

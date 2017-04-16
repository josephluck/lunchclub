import * as Login from './login'
import * as Lunch from './lunch'
import * as Authentication from './authentication'

export type Models = Helix.Models<
  Login.Namespace &
  Lunch.Namespace &
  Authentication.Namespace &
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
    },
  }
}

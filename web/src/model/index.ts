import * as Login from './login'
import * as Lunch from './lunch'

export type Models = Helix.Models<
  Login.Namespace &
  Lunch.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
>

export default function () {
  return {
    state: {
      foo: 'foo',
    },
    reducers: {},
    effects: {},
    models: {
      [Login.namespace]: Login.model(),
      [Lunch.namespace]: Lunch.model(),
    },
  }
}

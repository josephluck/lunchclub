import * as random from 'faker'
import {Models} from './'

export interface State {
  lunch: any
  lunches: any[]
}

export interface Reducers {
  setLunch: Helix.Reducer<Models, State, any>
  setLunches: Helix.Reducer<Models, State, any[]>
}

export interface Effects {
  listen: Helix.Effect<Models, any>
  create: Helix.Effect0<Models>
  update: Helix.Effect<Models, any>
  fetchAll: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'lunch'
export interface Namespace { 'lunch': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model ({
  api,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      lunch: null,
      lunches: [],
    },
    reducers: {
      setLunch: (state, lunch) => ({lunch}),
      setLunches: (state, lunches) => ({lunches}),
    },
    effects: {
      listen (state, actions, id) {
        const ref = api.database.ref(`lunches/${id}`)
        ref.on('value', snapshot => {
          actions.lunch.setLunch({
            id: snapshot.id,
            ...snapshot.val(),
          })
        })
        return ref
      },
      create (state, actions) {
        const ref = actions.lunch.listen(random.random.uuid())
        ref.set({
          captain: state.authentication.user.uid,
        })
      },
      update (state, actions, payload) {
        const ref = actions.lunch.listen(state.lunch.lunch.id)
        ref.set(payload)
      },
      fetchAll (state, actions) {
        const ref = api.database().ref('lunches').orderByChild('created')
        ref.on('value', snapshot => {
          let lunches = []
          snapshot.forEach(lunch => lunches.push({id: lunch.key, ...lunch.val()}))
          actions.lunch.setLunches(lunches)
          if (lunches.length) {
            actions.lunch.setLunch(lunches[0])
            actions.lunch.listen(lunches[0].id)
          }
        })
      },
    },
  }
}

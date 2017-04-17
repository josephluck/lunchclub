import * as random from 'faker'
import {Models} from './'

export interface State {
  lunch: any
  lunches: any[]
}

export interface Reducers {
  setLunches: Helix.Reducer<Models, State, any[]>
}

export interface Effects {
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
      lunches: [],
    },
    computed (state) {
      return {
        lunch: state.lunches.length ? state.lunches[0] : null,
      }
    },
    reducers: {
      setLunches: (state, lunches) => ({lunches}),
    },
    effects: {
      create (state, actions) {
        const ref = api.database().ref(`lunches/${random.random.uuid()}`)
        ref.set({
          status: 'incomplete',
          captain: state.authentication.user.uid,
        })
      },
      update (state, actions, payload) {
        const ref = api.database().ref(`lunches/${state.lunch.lunch.id}`)
        ref.update(payload)
      },
      fetchAll (state, actions) {
        const ref = api.database().ref('lunches').orderByChild('time')
        ref.on('value', snapshot => {
          console.log('fetchAll value ref listener fired')
          const lunchesVals = snapshot.val()
          if (lunchesVals) {
            const lunches = Object.keys(lunchesVals).map(key => {
              return {
                id: key,
                ...lunchesVals[key],
              }
            })
            actions.lunch.setLunches(lunches)
          }
        })
      },
    },
  }
}

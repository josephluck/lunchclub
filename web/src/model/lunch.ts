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
  fetch: Helix.Effect0<Models>
  create: Helix.Effect0<Models>
  update: Helix.Effect<Models, any>
  updatePlace: Helix.Effect<Models, any>
  updateTime: Helix.Effect<Models, number>
  updateDecision: Helix.Effect1<Models, string, boolean>
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
      if (state.lunches.length) {
        return {
          lunch: state.lunches[0],
        }
      } else {
        return {
          lunch: null,
        }
      }
    },
    reducers: {
      setLunches: (state, lunches) => ({lunches}),
    },
    effects: {
      fetch (state, actions) {
        const ref = api.database().ref('lunches').orderByChild('time')
        ref.on('value', snapshot => {
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
      create (state, actions) {
        const ref = api.database().ref(`lunches/${random.random.uuid()}`)
        const invites = state.users.users.reduce((prev, curr) => {
          return {
            ...prev,
            [curr.id]: curr.id === state.authentication.user.id ? 'yes' : 'not-decided',
          }
        }, {})
        ref.set({
          status: 'pending',
          invites,
        })
      },
      update (state, actions, payload) {
        const ref = api.database().ref(`lunches/${state.lunch.lunch.id}`)
        ref.update(payload)
      },
      updatePlace (state, actions, place) {
        actions.lunch.update({ place })
      },
      updateTime (state, actions, time) {
        actions.lunch.update({ status: 'created', time })
      },
      updateDecision (state, actions, userId, decision) {
        actions.lunch.update({
          invites: {
            ...state.lunch.lunch.invites,
            [userId]: decision,
          }
        })
      }
    },
  }
}

import {Models} from './'

export interface State {
  lunch: any
  lunches: any[]
}

export interface Reducers {
  setLunches: Helix.Reducer<Models, State, any[]>
}

export interface Effects {
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
      setLunches: (state, lunches) => ({lunches}),
    },
    effects: {
      fetchAll (state, actions) {
        return new Promise(resolve => {
          const ref = api.database().ref('lunches').orderByChild('created')
          ref.on('value', snapshot => {
            let lunches = []
            snapshot.forEach(lunch => lunches.push({id: lunch.key, ...lunch.val()}))
            resolve(actions.lunch.setLunches(lunches))
          })
        })
      },
    },
  }
}

import {Models} from './'

import user from './fixtures/user'

export interface State {}

export interface Reducers {
  setUser: Helix.Reducer<Models, State, any>
}

export interface Effects {
  login: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'authentication'
export interface Namespace { 'authentication': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      user: null,
    },
    reducers: {
      setUser (state, user) {
        return {user}
      },
    },
    effects: {
      login (state, actions) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(actions[namespace].setUser(user))
          }, 500)
        })
      },
    },
  }
}

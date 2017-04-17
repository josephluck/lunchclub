import {Models} from './'

export interface State {
  user: any
  token: any
}

export interface Reducers {
  setUser: Helix.Reducer<Models, State, any>
  setToken: Helix.Reducer<Models, State, any>
}

export interface Effects {
  login: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'authentication'
export interface Namespace { 'authentication': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model ({
  api,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  const googleAuthProvider = new api.auth.GoogleAuthProvider()
  return {
    state: {
      user: null,
      token: window.localStorage.getItem('token') || null,
    },
    reducers: {
      setUser (state, user) { return {user} },
      setToken (state, token) { return {token} },
    },
    effects: {
      login (state, actions) {
        if (!state.authentication.token) {
          api.auth().signInWithPopup(googleAuthProvider).then((result) => {
            const token = result.credential.accessToken
            const user = result.user
            window.localStorage.setItem('token', token)
            actions.authentication.setToken(token)
            actions.authentication.setUser(user)
          })
        }
        api.auth().onAuthStateChanged((user) => {
          if (user) {
            actions.authentication.setUser(user)
          }
        })
      },
    },
  }
}

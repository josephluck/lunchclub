import {Models} from './'

export interface State {
  users: any
}

export interface Reducers {
  set: Helix.Reducer<Models, State, any>
}

export interface Effects {
  fetch: Helix.Effect0<Models>
  create: Helix.Effect<Models, any>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'users'
export interface Namespace { 'users': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model ({
  api,
}): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      users: [],
    },
    reducers: {
      set: (state, users) => ({users}),
    },
    effects: {
      fetch (state, actions) {
        const ref = api.database().ref('users')
        ref.on('value', snapshot => {
          const usersVals = snapshot.val()
          if (usersVals) {
            const users = Object.keys(usersVals).map(key => {
              return {
                id: key,
                ...usersVals[key],
              }
            })
            actions.users.set(users)
          }
        })
      },
      create (state, actions, user) {
        const ref = api.database().ref(`users/${user.id}`)
        ref.set(user)
      },
    },
  }
}

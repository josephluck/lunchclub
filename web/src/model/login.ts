import {Models} from './'

export interface State {}

export interface Reducers {}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'login'
export interface Namespace { 'login': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {},
    reducers: {},
    effects: {},
  }
}

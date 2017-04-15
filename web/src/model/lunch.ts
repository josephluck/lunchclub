import {Models} from './'

import lunchFixture from './fixtures/lunch'

export interface State {}

export interface Reducers {}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'lunch'
export interface Namespace { 'lunch': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  const currentStatus = 'pending'
  // const currentStatus = 'created'
  // const currentStatus = 'complete'
  return {
    state: {
      lunch: lunchFixture(currentStatus),
      lunches: [
        lunchFixture('complete'),
        lunchFixture('complete'),
        lunchFixture('complete'),
        lunchFixture('complete'),
        lunchFixture('complete'),
      ]
    },
    reducers: {},
    effects: {},
  }
}

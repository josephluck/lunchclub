import * as random from 'faker'

import person from './person'

export type Status = 'created' | 'complete'

export default function (status: Status, user?: any) {
  return {
    who: user ? user : person(),
    accepted: random.random.boolean(),
    review: status === 'complete' ? random.lorem.paragraph() : null,
  }
}

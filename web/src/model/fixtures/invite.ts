import * as random from 'faker'

import person from './person'

export type Status = 'created' | 'complete'

export default function (status: Status) {
  return {
    who: person(),
    accepted: random.random.boolean(),
    review: status === 'complete' ? random.lorem.paragraph() : null,
  }
}

import * as random from 'faker'

import person from './person'

export default function () {
  return {
    by: person(),
    comment: random.lorem.paragraph(),
    rating: random.random.number({min: 0, max: 5}),
  }
}

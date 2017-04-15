import * as random from 'faker'

import review from './review'

export default function () {
  return {
    id: random.random.uuid(),
    name: random.company.companyName(),
    image: random.image.imageUrl(400, 400, 'food'),
    rating: random.random.number({min: 0, max: 5}),
    lat: random.address.latitude(),
    lng: random.address.longitude(),
    reviews: [
      review(),
      review(),
      review(),
      review(),
    ],
  }
}

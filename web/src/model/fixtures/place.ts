import * as random from 'faker'

import review from './review'

export default function () {
  const imgSize = Math.floor(Math.random() * 1000) + 500 // Force generate a random image each time
  return {
    id: random.random.uuid(),
    name: random.company.companyName(),
    cuisine: 'Thai',
    image: random.image.imageUrl(imgSize, imgSize, 'food'),
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

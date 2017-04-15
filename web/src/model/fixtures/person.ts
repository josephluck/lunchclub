import * as random from 'faker'

export default function () {
  return {
    id: random.random.uuid(),
    name: random.name.findName(),
    avatar: random.image.avatar(),
  }
}

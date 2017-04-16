import * as random from 'faker'

import invite from './invite'
import place from './place'
import user from './user'

export type Status = 'pending' | 'created' | 'complete'

export default function (status) {
  return {
    status,
    captain: user,
    where: status !== 'pending' ? place() : null,
    when: status !== 'pending' ? random.date.future() : null,
    invites: status !== 'pending'
      ? Array.from({length: 5}, () => invite(status))
      : null,
  }
}

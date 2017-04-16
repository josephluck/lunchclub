import h from 'helix-react/lib/html'

import {Models} from '../model'
import LunchesList from '../components/lunches-list'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const user = state.authentication.user
    const lunches = state.lunch.lunches

    if (user) {
      const lunch = state.lunch.lunch
      const decided = lunch.status !== 'pending'
      const isCaptain = lunch.captain.id === user.id

      return isCaptain && !decided
        ? (
          <div>
            {'Captain - Not Decided'}
            <LunchesList
              className='ph-3'
              lunches={lunches}
            />
          </div>
        )
        : decided
        ? (
          <div>
            {'Show Lunch page'}
          </div>
        )
        : (
          <div>
            <LunchesList
              className='ph-3'
              lunches={lunches}
            />
          </div>
        )
    } else {
      return null
    }
  },
}

export default page

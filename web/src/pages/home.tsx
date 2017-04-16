import h from 'helix-react/lib/html'

import {Models} from '../model'
import LunchesList from '../components/lunches-list'
import Header from '../components/header'

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
            <Header
              className='mb-4'
              img={'https://www2.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img64.jpg'}
              card={(
                <div className='fw-500 d-flex align-items-center'>
                  {`You're Captain`}
                  <span className='d-ib ml-2 ss-right fs-small' />
                </div>
              )}
            />
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

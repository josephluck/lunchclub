import h from 'helix-react/lib/html'

import {Models} from '../model'
import LunchesList from '../components/lunches-list'
import Header from '../components/header'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const lunches = state.lunch.lunches

    return (
      <div>
        <Header
          className='mb-4'
          img={'https://www2.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img64.jpg'}
          card={(
            <a
              className='d-ib bra-3 ph-3 pv-2 bg-primary fc-white fw-500 d-flex align-items-center'
              onClick={() => {
                actions.lunch.create()
                actions.location.set('/create/venue')
              }}
            >
              {`You're Captain`}
              <span className='d-ib ml-2 ss-right fs-small' />
            </a>
          )}
        />
        <LunchesList
          className='ph-3'
          lunches={lunches}
        />
      </div>
    )
  },
}

export default page

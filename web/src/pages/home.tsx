import h from 'helix-react/lib/html'
import * as moment from 'moment'

import {Models} from '../model'
import LunchesList from '../components/lunches-list'
import Header from '../components/header'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const lunches = state.lunch.lunches
    const lunch = state.lunch.lunch
    const isFuture = lunch && moment(lunch.time).isAfter(moment())

    return (
      <div>
        {lunch && isFuture
          ? (
            <div>
              {'Lunch view'}
            </div>
          ) : (
            <div>
              <Header
                className='mb-4'
                img={'https://www2.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img64.jpg'}
                card={(
                  <a
                    className='d-ib bra-3 ph-3 pv-2 bg-primary fc-white fw-500 d-flex align-items-center'
                    onClick={() => {
                      if (lunch) {
                        if (lunch.place) {
                          actions.location.set('/create/time')
                        } else {
                          actions.location.set('/create/venue')
                        }
                      } else {
                        actions.lunch.create()
                        actions.location.set('/create/venue')
                      }
                    }}
                  >
                    {lunch ? 'Continue Creating Lunch' : 'Create a Lunch'}
                    <span className='d-ib ml-2 ss-right fs-small' />
                  </a>
                )}
              />
            </div>
          )
        }
        <LunchesList
          className='ph-3'
          lunches={lunches.filter(lunch => lunch.status === 'created')}
        />
      </div>
    )
  },
}

export default page

import h from 'helix-react/lib/html'
import * as moment from 'moment'

import {Models} from '../model'
import LunchesList from '../components/lunches-list'
import Header from '../components/header'
import LunchView from '../components/lunch-view'

const isFuture = (time) => moment(time).isAfter(moment())

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const lunches = state.lunch.lunches
    const lunch = state.lunch.lunch
    const lunchInTheFuture = lunch && lunch.status === 'created' && isFuture(lunch.time)
    const lunchInThePast = lunch && lunch.status === 'created' && !isFuture(lunch.time)
    const lunchNotFinishedCreating = lunch && lunch.status === 'pending'

    const TopSection = () => {
      if (lunchInTheFuture) {
        return (
          <LunchView
            lunch={state.lunch.lunch}
            state={state}
            actions={actions}
          />
        )
      } else if (lunchNotFinishedCreating) {
        return (
          <Header
            className='mb-4'
            img={'https://www2.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img64.jpg'}
            card={(
              <a
                className='d-ib bra-3 ph-3 pv-2 bg-primary fc-white fw-500 d-flex align-items-center'
                onClick={() => {
                  if (lunch.place) {
                    actions.location.set('/create/time')
                  } else {
                    actions.location.set('/create/venue')
                  }
                }}
              >
                {'Continue Creating Lunch'}
                <span className='d-ib ml-2 ss-right fs-small' />
              </a>
            )}
          />
        )
      } else if (!lunch || lunchInThePast) {
        return (
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
                {'Create a Lunch'}
                <span className='d-ib ml-2 ss-right fs-small' />
              </a>
            )}
          />
        )
      } else {
        console.log('Something went wrong', lunch)
        return null
      }
    }

    return (
      <div>
        <TopSection />
        {!lunchInTheFuture ?
          (
            <LunchesList
              className='ph-3'
              lunches={lunches.filter(lunch => lunch.status === 'created')}
              onClick={id => actions.location.set(`/lunches/${id}`)}
            />
          ) : null
        }
      </div>
    )
  },
}

export default page

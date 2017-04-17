import h from 'helix-react/lib/html'
import {Models} from '../model'
import ListItem from '../components/list-item'
import VenueHeader from '../components/venue-header'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div>
        <VenueHeader venue={state.lunch.lunch.place} />
        <div className='ph-3 pt-4'>
          {state.create.times.map((time, index) => {
            return (
              <ListItem
                key={index}
                className={index !== 0 ? 'bt' : ''}
                primary={time.format('h:mm a')}
                right={(
                  <span className='fc-primary ss-navigateright' />
                )}
                onClick={() => {
                  actions.lunch.updateTime(time.valueOf())
                  actions.location.set('/')
                }}
              />
            )
          })}
        </div>
      </div>
    )
  },
}

export default page

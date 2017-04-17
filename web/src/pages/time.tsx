import h from 'helix-react/lib/html'
import {Models} from '../model'
import ListItem from '../components/list-item'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div className='ph-3 pt-4'>
        <div>
          {state.location.params.venueId}
        </div>
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
                actions.create.addTime(time.format())
                actions.location.set('/')
              }}
            />
          )
        })}
      </div>
    )
  },
}

export default page

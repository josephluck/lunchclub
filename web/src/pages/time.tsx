import h from 'helix-react/lib/html'
import {Models} from '../model'
import ListItem from '../components/list-item'

const times = [
  new Date().getTime(),
  new Date().getTime(),
  new Date().getTime(),
  new Date().getTime(),
  new Date().getTime(),
  new Date().getTime(),
  new Date().getTime(),
]

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div className='ph-3 pt-4'>
        <div>
          {state.location.params.venueId}
        </div>
        {times.map((time, index) => {
          return (
            <ListItem
              key={index}
              className={index !== 0 ? 'bt' : ''}
              primary={time}
              right={(
                <span className='fc-primary ss-navigateright' />
              )}
            />
          )
        })}
      </div>
    )
  },
}

export default page

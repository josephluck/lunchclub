import h from 'helix-react/lib/html'
import {Models} from '../model'
import ListItem from '../components/list-item'
import VenueHeader from '../components/venue-header'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    if (state.lunch.lunch && !state.lunch.lunch.place) {
      actions.location.set('/create/venue')
      return null
    } else if (state.lunch.lunch) {
      return (
        <div>
          <VenueHeader
            venue={state.lunch.lunch.place}
            map={state.googleMap.map}
            onMapCreated={(map) => {
              actions.googleMap.setMap(map)
              actions.googleMap.goToPlace(state.lunch.lunch.place)
            }}
          />
          <div className='ph-3 pt-4'>
            {state.googleMap.times.map((time, index) => {
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
    } else {
      return null
    }
  },
}

export default page

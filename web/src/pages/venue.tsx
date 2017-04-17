import h from 'helix-react/lib/html'
import {Models} from '../model'
import TextField from '../components/text-field'
import ListItem from '../components/list-item'
import Rating from '../components/rating'
import GoogleMap from '../components/map'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const localState = state['map-search']
    return (
      <div>
        <div className='w-100 h-9 pos-relative'>
          <GoogleMap
            onMapCreated={(map) => {
              actions['map-search'].setMap(map)
              actions['map-search'].getNearbyPlaces()
            }}
          />
          <div
            className='pos-absolute posl-3 posr-3 posb-0'
            style={{
              transform: 'translateY(50%)',
            }}
          >
            <TextField
              placeholder={'Search for a Venue'}
              oninput={actions['map-search'].search}
              value={localState.query}
              autoFocus
            />
          </div>
        </div>

        <div className='ph-3 pt-4'>
          {localState.places.map((place: google.maps.places.PlaceResult, index) => {
            const avatar = place.photos && place.photos.length
              ? place.photos[0].getUrl({
                maxHeight: 100,
                maxWidth: 100,
              })
              : ''

            return (
              <ListItem
                key={index}
                className={index !== 0 ? 'bt' : ''}
                avatar={avatar}
                primary={place.name}
                secondary={place.formatted_address || place.vicinity}
                onClick={() => {
                  actions.create.addPlace(place.place_id)
                  actions.location.set(`/create/${place.place_id}/time`)
                }}
                right={(
                  <Rating rating={Math.round(place.rating)} />
                )}
              />
            )
          })}
        </div>
      </div>
    )
  },
}

export default page

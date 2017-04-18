import h from 'helix-react/lib/html'
import {Models} from '../model'
import TextField from '../components/text-field'
import ListItem from '../components/list-item'
import Rating from '../components/rating'
import GoogleMap from '../components/map'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const localState = state.googleMap
    return (
      <div>
        <div className='w-100 h-9 pos-relative'>
          <GoogleMap
            map={state.googleMap.map}
            onMapCreated={(map) => {
              actions.googleMap.setMap(map)
              actions.googleMap.getNearbyPlaces()
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
              oninput={actions.googleMap.search}
              value={localState.query}
              autoFocus
            />
          </div>
        </div>

        <div className='ph-3 pt-4'>
          {localState.places.map((place: google.maps.places.PlaceResult, index) => {
            const avatar = place.photos && place.photos.length
              ? place.photos[0].getUrl({
                maxHeight: 1000,
                maxWidth: 1000,
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
                  actions.lunch.updatePlace({
                    id: place.place_id,
                    name: place.name,
                    rating: place.rating,
                    address: place.formatted_address || place.vicinity,
                    avatar,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  })
                  actions.location.set(`/create/time`)
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

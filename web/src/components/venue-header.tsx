import h from 'helix-react/lib/html'
import GoogleMap from './map'
import Rating from './rating-stars'

interface Props {
  venue,
  onClick?: () => any
}

function VenueHeader ({
  venue,
  onClick = () => null,
}: Props) {
  const loc = {
    lat: venue.lat,
    lng: venue.lng,
  }
  return (
    <div className='w-100 h-9 pos-relative mb-4'>
      <GoogleMap
        loc={loc}
        zoom={18}
        markers={[{
          key: venue.id,
          position: loc,
        }]}
        pure={true}
      />
      <div
        className='pos-absolute posl-3 posr-3 posb-0 ta-c'
        style={{
          transform: 'translateY(50%)',
        }}
      >
        <div
          className='d-ib bra-3 ph-3 pv-2 bg-primary fc-white fw-500'
          onClick={onClick}
        >
          <div className='mb-2'>{venue.name}</div>
          <Rating rating={venue.rating} />
        </div>
      </div>
    </div>
  )
}

export default VenueHeader

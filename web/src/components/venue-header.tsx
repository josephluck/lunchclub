import h from 'helix-react/lib/html'
import Header from './header'
import Rating from './rating-stars'

interface Props {
  venue,
}

function VenueHeader ({
  venue,
}: Props) {
  return (
    <Header
      img={venue.avatar}
      className='mb-3'
      card={(
        <div
          className='d-ib bra-3 ph-3 pv-2 bg-primary fc-white fw-500'
        >
          <div className='mb-2'>{venue.name}</div>
          <Rating rating={venue.rating} />
        </div>
      )}
    />
  )
}

export default VenueHeader

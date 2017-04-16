import h from 'helix-react/lib/html'

interface Props {
  rating: number
}

function Rating ({
  rating,
}: Props) {
  return (
    <div className='d-flex'>
      <span className='fs-huge fw-100 ta-c w-4'>{rating}</span>
      <span className='d-ib fs-tiny ss-star fc-gold' />
    </div>
  )
}

export default Rating

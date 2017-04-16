import h from 'helix-react/lib/html'

interface Props {
  rating: number
  className?: string
}

function Rating ({
  rating,
  className = '',
}: Props) {
  const stars = Array.from({length: 5})
  const roundedRating = Math.floor(rating)
  return (
    <div className={`d-ib ${className}`}>
      {stars.map((_, index) => {
        return (
          <span
            key={index}
            className={`
              mr-1
              ${index < roundedRating ? 'ss-star fc-gold' : 'ss-emptystar fc-grey-200'}
            `}
          />
        )
      })}
    </div>
  )
}

export default Rating

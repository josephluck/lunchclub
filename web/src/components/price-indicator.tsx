import h from 'helix-react/lib/html'

interface Props {
  price: number
  className?: string
}

function Price ({
  price,
  className = '',
}: Props) {
  const stars = Array.from({length: 5})
  const roundedPrice = Math.floor(price)
  return (
    <div className={`d-ib ${className}`}>
      {stars.map((_, index) => {
        return (
          <span
            key={index}
            className={`
              ss-banknote mr-1
              ${index < roundedPrice ? 'fc-primary' : 'fc-grey-200'}
            `}
          />
        )
      })}
    </div>
  )
}

export default Price

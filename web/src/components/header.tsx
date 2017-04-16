import h from 'helix-react/lib/html'

interface Props {
  img: string
  card: any
  className?: string
}

function Header ({
  img,
  card,
  className = '',
}: Props) {
  return (
    <div
      className={`d-flex flex-direction-column h-9 bb bc-grey-100 ${className}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className='flex-1' />
      <div
        className='ta-c'
        style={{
          transform: 'translateY(50%)',
        }}
      >
        {card}
      </div>
    </div>
  )
}

export default Header

import h from 'helix-react/lib/html'

interface Props {
  className?: string
  avatar?: string
  primary: any
  secondary?: any
  right: any
  onClick?: () => any
}

function ListItem ({
  className = '',
  avatar,
  primary,
  secondary,
  right,
  onClick = () => null
}: Props) {
  return (
    <div
      className={`d-flex align-items-center bc-grey-100 ${className} pv-3`}
      onClick={onClick}
    >
      {avatar
        ? (
          <div
            className='mr-3 d-flex align-items-center'
          >
            <img
              src={avatar}
              className='w-5 h-5 bra-pill of-hidden'
            />
          </div>
        )
        : null
      }
      <div
        className='flex-1'
      >
        {secondary
          ? (
            <span
              className='d-b fs-small fc-grey-600 mb-1'
            >
              {secondary}
            </span>
          ) : null
        }
        {primary}
      </div>
      <div
        className='ml-3'
      >
        {right}
      </div>
    </div>
  )
}

export default ListItem

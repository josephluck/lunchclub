import h from 'helix-react/lib/html'

function navBar ({
  back,
}) {
  return (
    <div className='d-flex bb bc-grey-100 pa-3'>
      <div className='flex-1'>
        {back
          ? (
            <a
              className='ss-navigateleft'
              href={back}
            />
          ) : null
        }
      </div>
      <span className='fw-500'>
        Lunch Club
      </span>
      <div className='flex-1 ta-r'>
      </div>
    </div>
  )
}

export default navBar

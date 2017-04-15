import h from 'helix-react/lib/html'

function navBar () {
  return (
    <div className='d-flex bb bc-grey-100 pa-3'>
      <div className='flex-1'>
        <span className='ss-menu' />
      </div>
      <span>
        Lunch Club
      </span>
      <div className='flex-1 ta-r'>
        <span className='ss-user' />
      </div>
    </div>
  )
}

export default navBar

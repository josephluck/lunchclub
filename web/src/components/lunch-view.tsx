import h from 'helix-react/lib/html'
import * as moment from 'moment'
import ListItem from '../components/list-item'
import VenueHeader from '../components/venue-header'

export default function LunchView ({
  state,
  actions,
}) {
  const lunch = state.lunch.lunch
  const invites = Object.keys(lunch.invites).map(key => {
    const user = state.users.users.find(u => u.id === key)
    return {
      accepted: lunch.invites[key],
      ...user,
    }
  }).sort(user => user.accepted === true ? 0 : user.accepted === null ? 1 : 2)
  return (
    <div>
      <VenueHeader venue={lunch.place} />
      <div className='ph-3 pt-5'>
        <div className='mb-3 ta-c'>
          <div className='fc-grey-600 mb-1'>
            {moment(lunch.time).format('dddd, MMMM Do YYYY')}
          </div>
          <div className='fs-large'>
            {moment(lunch.time).format('h:mm a')}
          </div>
        </div>

        {invites.map((invite, index) => {
          return (
            <ListItem
              key={index}
              avatar={invite.avatar}
              className={index !== 0 ? 'bt' : ''}
              primary={invite.name}
              secondary={
                invite.accepted === true
                  ? 'Going'
                  : invite.accepted === false
                  ? 'Can\'t Make It'
                  : 'Hasn\'t Decided Yet'
              }
              right={(
                <span
                  className={`
                    ${invite.accepted === true ? 'fc-green ss-check' : ''}
                    ${invite.accepted === false ? 'fc-red ss-delete' : ''}
                    ${invite.accepted === null ? 'fc-primary ss-hyphen' : ''}
                  `}
                />
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

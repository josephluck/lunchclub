import h from 'helix-react/lib/html'
import * as moment from 'moment'
import ListItem from '../components/list-item'
import VenueHeader from '../components/venue-header'

const isFuture = (time) => moment(time).isAfter(moment())

export default function LunchView ({
  state,
  lunch,
  actions,
}) {
  const lunchInThePast = lunch && lunch.status === 'created' && !isFuture(lunch.time)
  const _invites = Object.keys(lunch.invites).map(key => {
    const user = state.users.users.find(u => u.id === key)
    return {
      accepted: lunch.invites[key],
      ...user,
    }
  })
  const currentUser = _invites.find(invite => invite.id === state.authentication.user.id)
  const invites = _invites
    .sort(invite => {
      if (invite.id !== currentUser.id) {
        return 0
      } else if (invite.accepted === 'yes') {
        return 1
      } else if (invite.accepted === 'not-decided') {
        return 2
      } else {
        return 3
      }
    })
    .reverse()

  return (
    <div>
      <VenueHeader
        venue={lunch.place}
        onClick={() => lunchInThePast ? null : actions.location.set('/edit/venue')}
      />
      <div className='ph-3 pt-5'>
        <div
          className='mb-3 ta-c'
          onClick={() => lunchInThePast ? null : actions.location.set('/edit/time')}
        >
          <div className='fc-grey-600 mb-1'>
            {moment(lunch.time).format('dddd, MMMM Do YYYY')}
          </div>
          <div className='fs-large'>
            {moment(lunch.time).format('h:mm a')}
          </div>
        </div>

        {!lunchInThePast
          ? (
            <div className='mb-2'>
              <div className='d-flex'>
                <button
                  onClick={() => actions.lunch.updateDecision(currentUser.id, 'yes')}
                  className={`
                    flex-1 ta-c pa-2 bra-2 fw-500 ba bw-medium mr-1
                    ${currentUser.accepted === 'yes' ? 'fc-white bg-green bc-green' : 'fc-green bg-white bc-green'}
                  `}
                >
                  {'I can make it'}
                </button>
                <button
                  onClick={() => actions.lunch.updateDecision(currentUser.id, 'no')}
                  className={`
                    flex-1 ta-c pa-2 bra-2 fw-500 ba bw-medium ml-1
                    ${currentUser.accepted === 'no' ? 'fc-white bg-red bc-red' : 'fc-red bg-white bc-red'}
                  `}
                >
                  {'I can\'t make it'}
                </button>
              </div>
            </div>
          ) : null
        }
        {invites.map((invite, index) => {
          return (
            <ListItem
              key={index}
              avatar={invite.avatar}
              className={index !== 0 ? 'bt' : ''}
              primary={invite.name}
              secondary={
                lunchInThePast
                  ? invite.accepted === 'yes'
                    ? 'Went'
                    : invite.accepted === 'no'
                    ? 'Didn\'t Make It'
                    : 'Didn\'t Decide'
                  : invite.accepted === 'yes'
                    ? 'Going'
                    : invite.accepted === 'no'
                    ? 'Can\'t Make It'
                    : 'Hasn\'t Decided Yet'
              }
              right={(
                <span
                  className={`
                    ${invite.accepted === 'yes' ? 'fc-green ss-check' : ''}
                    ${invite.accepted === 'no' ? 'fc-red ss-delete' : ''}
                    ${invite.accepted === 'not-decided' ? 'fc-primary ss-hyphen' : ''}
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

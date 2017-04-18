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
    .filter(invite => invite.id !== currentUser.id)
    .sort(invite => invite.accepted === true ? 0 : invite.accepted === null ? 1 : 2)

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

        {currentUser.accepted === 'not-decided' && !lunchInThePast
          ? (
            <div className='mb-2'>
              <div className='d-flex'>
                <button
                  onClick={() => actions.lunch.updateDecision(currentUser.id, 'yes')}
                  className='flex-1 mr-1 ta-c pa-2 bra-2 fw-500 fc-white bg-green'
                  style={{
                    border: 0,
                  }}
                >
                  {'I can make it'}
                </button>
                <button
                  onClick={() => actions.lunch.updateDecision(currentUser.id, 'no')}
                  className='flex-1 ml-1 ta-c pa-2 bra-2 fw-500 fc-white bg-red'
                  style={{
                    border: 0,
                  }}
                >
                  {'I can\'t make it'}
                </button>
              </div>
            </div>
          ) : (
            <ListItem
              className='bb'
              avatar={currentUser.avatar}
              primary={currentUser.name}
              secondary={
                lunchInThePast
                  ? currentUser.accepted === 'yes'
                    ? 'You Went'
                    : currentUser.accepted === 'no'
                    ? 'You Didn\'t Make It'
                    : 'You Didn\'t Decide'
                  : currentUser.accepted === 'yes'
                    ? 'You\'re Going'
                    : currentUser.accepted === 'no'
                    ? 'You Can\'t Make It'
                    : 'You Haven\'t Decided Yet'
              }
              right={lunchInThePast ? null : (
                <div className='d-flex align-items-center'>
                  <select
                    value={currentUser.accepted.toString()}
                    className='d-ib mr-1'
                    disabled={lunchInThePast}
                    style={{
                      borderWidth: 0,
                      background: 'transparent',
                      direction: 'rtl',
                    }}
                    onChange={e => {
                      actions.lunch.updateDecision(currentUser.id, e.target.value)
                    }}
                  >
                    <option value={'yes'}>{'Going'}</option>
                    <option value={'no'}>{'Not Going'}</option>
                  </select>
                  <span
                    className={`
                      ${currentUser.accepted === 'yes' ? 'fc-green ss-check' : ''}
                      ${currentUser.accepted === 'no' ? 'fc-red ss-delete' : ''}
                      ${currentUser.accepted === 'not-decided' ? 'fc-primary ss-hyphen' : ''}
                    `}
                  />
                </div>
              )}
            />
          )
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
                  ? invite.accepted === true
                    ? 'Went'
                    : invite.accepted === false
                    ? 'Didn\'t Make It'
                    : 'Didn\'t Decide'
                  : invite.accepted === true
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

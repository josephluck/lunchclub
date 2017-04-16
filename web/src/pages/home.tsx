import h from 'helix-react/lib/html'

import {Models} from '../model'
import prettyDate from '../utils/pretty-date'
import ListItem from '../components/list-item'
import Rating from '../components/rating'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const user = state.authentication.user
    const lunches = state.lunch.lunches
    const lunch = state.lunch.lunch
    if (user) {
      const decided = lunch.status !== 'pending'
      const isCaptain = lunch.captain.id === user.id
      const inviteAccepted = decided ? lunch.invites.find(invite => invite.who.id === user.id).accepted : false
      const TopSection = () => {
        if (isCaptain) {
          if (decided) {
            return (
              <div>
                {'Captain - Decided'}
              </div>
            )
          } else {
            return (
              <div>
                {'Captain - Not Decided'}
              </div>
            )
          }
        } else {
          if (decided) {
            if (inviteAccepted === true) {
              return (
                <div>
                  {'Not Captain Decided - Accepted'}
                </div>
              )
            } else if (inviteAccepted === false) {
              return (
                <div>
                  {'Not Captain Decided - Declined'}
                </div>
              )
            } else {
              return (
                <div>
                  {'Not Captain Decided - Pending Invite'}
                </div>
              )
            }
          } else {
            return (
              <div>
                {'Not Captain Not Decided'}
              </div>
            )
          }
        }
      }

      return (
        <div>
          <TopSection />
          <div className='ph-3'>
            {lunches.map((lunch, index) => {
              return (
                <ListItem
                  key={index}
                  className={index !== 0 ? 'bt' : ''}
                  avatar={lunch.where.image}
                  primary={lunch.where.name}
                  secondary={prettyDate(lunch.when)}
                  right={(
                    <Rating
                      rating={lunch.where.rating}
                    />
                  )}
                />
              )
            })}
          </div>
        </div>
      )
    } else {
      return null
    }
  },
}

export default page

import h from 'helix-react/lib/html'
import {Models} from '../../model'

import Nav from '../../components/nav-bar'

const Alert = ({
  state,
  actions,
}) => {
  const user = state.authentication.user
  const lunch = state.lunch.lunch
  if (user && lunch) {
    const decided = lunch.status !== 'pending'
    const inviteAccepted = decided ? lunch.invites.find(invite => invite.who.id === user.id).accepted : false
    if (decided) {
      if (inviteAccepted === true) {
        return (
          <div>
            {'Youre in'}
          </div>
        )
      } else if (inviteAccepted === false) {
        return (
          <div>
            {'Youre out'}
          </div>
        )
      } else {
        return (
          <div>
            {'You need to decide'}
          </div>
        )
      }
    } else {
      return null
    }
  } else {
    return null
  }
}

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter (state, prev, actions) {
      actions.authentication.login()
      actions.lunch.fetchAll()
      if (page.onEnter) {
        page.onEnter(state, prev, actions)
      }
    },
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      if (state.authentication.user && state.authentication.token) {
        return (
          <div>
            <Nav />
            {page.view(state, prev, actions)}
            <Alert
              state={state}
              actions={actions}
            />
          </div>
        )
      } else {
        return <div />
      }
    },
  }
}

export default layout

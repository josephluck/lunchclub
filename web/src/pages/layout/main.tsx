import h from 'helix-react/lib/html'
import {Models} from '../../model'

import Nav from '../../components/nav-bar'

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
          </div>
        )
      } else {
        return <div />
      }
    },
  }
}

export default layout

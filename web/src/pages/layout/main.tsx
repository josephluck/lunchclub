import h from 'helix-react/lib/html'
import {Models} from '../../model'

import Nav from '../../components/nav-bar'

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter (state, prev, actions) {
      actions.authentication.login()
      if (page.onEnter) {
        page.onEnter(state, prev, actions)
      }
    },
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      return (
        <div>
          <Nav />
          {page.view(state, prev, actions)}
        </div>
      )
    },
  }
}

export default layout

import h from 'helix-react/lib/html'
import {Models} from '../../model'

import Nav from '../../components/nav-bar'

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      return (
        <div>
          <Nav />
          <div>
            {page.view(state, prev, actions)}
          </div>
        </div>
      )
    },
  }
}

export default layout

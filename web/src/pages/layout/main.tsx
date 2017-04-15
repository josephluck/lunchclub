import h from 'helix-react/lib/html'
import {Models} from '../../model'

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      return (
        <div>
          Lunch Club
          <div>
            {page.view(state, prev, actions)}
          </div>
        </div>
      )
    },
  }
}

export default layout

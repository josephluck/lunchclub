import h from 'helix-react/lib/html'

import {Models} from '../model'
import LunchView from '../components/lunch-view'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const lunch = state.lunch.lunches.find(l => l.id === state.location.params.lunchId)

    if (!lunch) {
      return null
    }
    return (
      <div>
        <LunchView
          lunch={lunch}
          state={state}
          actions={actions}
        />
      </div>
    )
  },
}

export default page

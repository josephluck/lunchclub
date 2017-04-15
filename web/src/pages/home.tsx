import h from 'helix-react/lib/html'
import {Models} from '../model'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div>
        {'Lunch Club'}
      </div>
    )
  },
}

export default page

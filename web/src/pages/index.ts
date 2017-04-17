import lMain from './layout/main'

import home from './home'
import venue from './venue'
import time from './time'

export default {
  '/': lMain(home),
  '/create/venue': lMain(venue),
  'create/:venueId/time': lMain(time),
}

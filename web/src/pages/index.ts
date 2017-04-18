import lMain from './layout/main'

import home from './home'
import lunch from './lunch'
import venue from './venue'
import time from './time'

export default {
  '/': lMain(home),
  '/lunches/:lunchId': lMain(lunch, '/'),
  '/create/venue': lMain(venue, '/'),
  '/create/time': lMain(time, '/create/venue'),
  '/edit/venue': lMain(venue, '/'),
  '/edit/time': lMain(time, '/'),
}

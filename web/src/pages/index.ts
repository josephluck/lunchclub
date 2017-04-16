import lMain from './layout/main'

import home from './home'
import venue from './venue'

export default {
  '/': lMain(home),
  '/create/venue': lMain(venue),
}

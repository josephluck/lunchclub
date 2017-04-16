import h from 'helix-react/lib/html'
import {Models} from '../model'

import prettyDate from '../utils/pretty-date'
import ListItem from '../components/list-item'
import Rating from '../components/rating'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    const lunches = state.lunch.lunches
    return (
      <div>
        <div className='ph-3'>
          {lunches.map((lunch, index) => {
            return (
              <ListItem
                key={index}
                className={index !== 0 ? 'bt' : ''}
                avatar={lunch.where.image}
                primary={lunch.where.name}
                secondary={prettyDate(lunch.when)}
                right={(
                  <Rating
                    rating={lunch.where.rating}
                  />
                )}
              />
            )
          })}
        </div>
      </div>
    )
  },
}

export default page

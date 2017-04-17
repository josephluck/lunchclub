import h from 'helix-react/lib/html'

import ListItem from './list-item'
import Rating from './rating'
import prettyDate from '../utils/pretty-date'

const LunchesList = ({
  lunches,
  className = '',
}) => (
  <div className={`${className}`}>
    {lunches.map((lunch, index) => {
      return (
        <ListItem
          key={index}
          className={index !== 0 ? 'bt' : ''}
          avatar={lunch.place.avatar}
          primary={lunch.place.name}
          secondary={prettyDate(lunch.time)}
          right={(
            <Rating
              rating={lunch.place.rating}
            />
          )}
        />
      )
    })}
  </div>
)

export default LunchesList

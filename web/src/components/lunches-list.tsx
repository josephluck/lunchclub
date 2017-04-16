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
)

export default LunchesList

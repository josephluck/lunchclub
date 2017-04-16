import * as moment from 'moment'

function prettyDate (date: string) {
  return moment(date).format('MMM Do YY, h:mm a')
}

export default prettyDate

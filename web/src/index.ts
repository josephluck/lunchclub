import helix from 'helix-react'
import log from 'helix-react/lib/log'
import model from './model'
import routes from './pages'

let mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: model(),
  routes,
  mount,
  plugins: [log],
})

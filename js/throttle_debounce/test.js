import debounce from './debounce.js'
import throttle from './throttle.js'

const WAIT_TIME = 1300

var count = 0

var container = document.createElement('div')
container.setAttribute('id', 'container')
container.setAttribute(
  'style',
  'height: 200px; background: #ccc; font-size: 2em; justify-content: center; align-items: center; display: flex'
)
container.innerHTML = count
document.body.appendChild(container)

function getUserAction(e) {
  count += 1
  container.innerHTML = count
}

// container.onmousemove = debounce(getUserAction, WAIT_TIME, true)
container.onmousemove = throttle(getUserAction, WAIT_TIME)

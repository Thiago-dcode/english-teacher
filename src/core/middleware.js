const { global } = require('./global')

let currentMidleware = -1
const prevMidleware = 0
let queue = []
const middleware = {
  set: (mw, params = []) => {
    registerMidleware(mw, params)
  }

}

const registerMidleware = async (middleware, params) => {
  queue.push(() => {
    middleware(...[...params, next])
  })
}
const next = () => {
  console.log(queue.length)
  if (currentMidleware > queue.length - 1) return
  currentMidleware++
  queue[currentMidleware]()
}
const cleanQueue = () => {
  queue = []
  currentMidleware = -1
}
const run = () => {
  next()
}
module.exports = { middleware, run, cleanQueue }
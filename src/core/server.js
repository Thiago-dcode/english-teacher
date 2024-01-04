const http = require('node:http')
const { middleware, run, cleanQueue } = require('./middleware.js')
const { registerRoute, route } = require('./routing')
const { bootStrap } = require('./bootstrap')
const { registerRoutes } = require('../routes/registerRoutes')
const processRequest = async (req, res) => {
  cleanQueue()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('content-type', 'text/html; charset=utf-8')
  await bootStrap(req, res)
  console.log('PATH', req.path)
  registerRoutes(registerRoute, middleware)
  const { fn, params } = route(req, res)
  middleware.set(fn, params)
  run()
}

const start = () => {
  const desirePort = 3000
  const server = http.createServer(processRequest)

  server.listen(desirePort, () => {
    console.log(`Server listen on http://localhost:${server.address().port}`)
  })
}

module.exports = {
  start
}

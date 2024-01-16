const http = require('node:http')
const { refreshSid } = require('../middleware/refreshSid.js')
const { initMiddleWare } = require('./middleware.js')
const { registerRoute, route } = require('./routing')
const { bootStrap } = require('./bootstrap/bootstrap.js')
const { registerRoutes } = require('../routes/registerRoutes')
const processRequest = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('content-type', 'text/html; charset=utf-8')
  const middleware = initMiddleWare(req, res)
  registerRoutes(registerRoute, middleware)
  await bootStrap(req, res, http)
  console.log('PATH', req.path)
  middleware.add(refreshSid)
  const { fn, params } = route(req, res)
  middleware.add(fn, params)

  middleware.next()
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

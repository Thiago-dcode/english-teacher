const http = require('node:http')
const { route, run } = require('./routing')
const { bootStrap } = require('./bootstrap')
const { registerRoutes } = require('../routes/registerRoutes')
const processRequest = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('content-type', 'text/html; charset=utf-8')
  await bootStrap(req, res)

  registerRoutes(route)
  run(req, res)
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

const { global } = require('../core/global.js')

const authorize = async (request, response, routes, next) => {
  const { method, path } = request

  // check if the current request route exists in routes array
  let routeExist = false

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]

    if (!(route.method === method && route.url === path)) {
      routeExist = false
      continue
    }
    routeExist = true
    break
  }

  if (!routeExist) return next()

  if (!request.isLoggedIn) {
    return response.end('<h1>Unauthorized</h1>')
  }
  next()
}
module.exports = { authorize }

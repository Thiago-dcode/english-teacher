const routes = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {}

}

const route = {

  GET: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.GET, urlToArray(url), callback)
  },
  POST: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.POST, urlToArray(url), callback)
  },
  PUT: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.PUT, urlToArray(url), callback)
  }
}

const run = (req, res) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!routes.hasOwnProperty(req.method)) {
    throw Error(`${req.method}, is not a valid method`)
  }

  return getRoute(routes[req.method], urlToArray(req.path), req, res)
}
function getDynamicRoute (obj) {
  return Object.keys(obj).find(item => item.includes('{') && item.includes('}'))
}
const urlToArray = (url) => {
  const arr = url.split('/').filter(Boolean).map(e => `/${e}`)
  return arr.length ? arr : ['/']
}
const getRoute = (obj, arrRoutes, req, res, index = 0) => {
  const property = arrRoutes[index]

  // eslint-disable-next-line no-prototype-builtins
  if (!obj.hasOwnProperty(property)) {
    if (index === arrRoutes.length - 1) {
      const dynamicRoute = getDynamicRoute(obj)
      if (dynamicRoute) {
        return obj[dynamicRoute]['/'](req, res, property.split('/').filter(Boolean).join(''))
      }
    }
    return (() => {
      res.end('<h1>404 not found</h1>')
    })()
  }
  if (index === arrRoutes.length - 1) {
    if (!obj[property].hasOwnProperty('/')) {
      return (() => {
        res.end('<h1>404 not found</h1>')
      })()
    }

    return obj[property]['/'](req, res)
  }
  return getRoute(obj[property], arrRoutes, req, res, index + 1)
}
const setRoute = (obj, arrRoutes, callback, index = 0) => {
  const property = arrRoutes[index]

  // eslint-disable-next-line no-prototype-builtins
  if (!obj.hasOwnProperty(property)) {
    obj[property] = {}
    if (index === arrRoutes.length - 1) {
      obj[property]['/'] = callback
      return
    }
    return setRoute(obj[property], arrRoutes, callback, index + 1)
  }
  if (index === arrRoutes.length - 1) {
    obj[property]['/'] = callback
    return
  }
  return setRoute(obj[property], arrRoutes, callback, index + 1)
}

module.exports = {
  route,
  run
}

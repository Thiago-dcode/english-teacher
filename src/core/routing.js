const routes = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {}

}

const registerRoute = {
  GET: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.GET, urlToArray(url), callback)
    return {
      method: 'GET',
      url
    }
  },
  POST: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.POST, urlToArray(url), callback)
    return {
      method: 'POST',
      url
    }
  },
  PUT: (url, callback) => {
    // eslint-disable-next-line no-prototype-builtins

    setRoute(routes.PUT, urlToArray(url), callback)
    return {
      method: 'PUT',
      url
    }
  }
}

const route = (req, res) => {
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
  const arr = url.split('/').map(e => `/${e}`)
  arr.shift()
  return arr.length ? arr : ['/']
}
const getRoute = (obj, arrRoutes, req, res, index = 0) => {
  const property = arrRoutes[index]

  // eslint-disable-next-line no-prototype-builtins
  if (!obj.hasOwnProperty(property)) {
    if (index === arrRoutes.length - 1) {
      const dynamicRoute = getDynamicRoute(obj)
      if (dynamicRoute) {
        return {
          fn: obj[dynamicRoute]['/'],
          params: [property.split('/').filter(Boolean).join('')]
        }
      }
    }
    return {
      fn: () => {
        res.end('<h1>404 not found</h1>')
      },
      params: []
    }
  }
  if (index === arrRoutes.length - 1) {
    if (!obj[property].hasOwnProperty('/')) {
      return {
        fn: () => {
          res.end('<h1>404 not found</h1>')
        },
        params: []
      }
    }
    // registerMidleWare(obj[property]['/'])
    return {
      fn: obj[property]['/'],
      params: [req, res]
    }
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
  registerRoute,
  route
}

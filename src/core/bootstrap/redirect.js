const { env } = require('../utils')

const redirect = (res, path, host) => {
  // Remove leading slash if it exists
  const normalizedPath = path[0] === '/' ? path.substring(1) : path

  res.writeHead(302, {
    Location: `${host}/${normalizedPath}`
  })

  // End the response to complete the redirect
  res.end()
}

const setRedirectProperty = (res) => {
  res.redirect = (path = '', host = env.get('HOST')) => {
    redirect(res, path, host)
  }
}

module.exports = { setRedirectProperty }

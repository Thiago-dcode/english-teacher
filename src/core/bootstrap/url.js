const { URL } = require('url')

const setUrlProperty = (req) => {
  const urlObject = new URL(req.url, `http://${req.headers.host}`)

  // Remove trailing slash if there is only one
  const trimmedPathname = urlObject.pathname.replace(/\/$/, '')

  req.path = trimmedPathname
  req.queryString = urlObject.searchParams.toString()
  req.searchParams = Object.fromEntries(urlObject.searchParams)
}

module.exports = { setUrlProperty }

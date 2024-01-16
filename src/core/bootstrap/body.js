function getBody (req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString() // Accumulate the incoming data
    })

    req.on('end', () => {
      let parsedBody = {}
      try {
        if (body.charAt(0) === '{') {
          parsedBody = JSON.parse(body)
        } else {
          parsedBody = body.split('&').reduce((acc, curr) => {
            const [key, value] = curr.split('=')
            return { ...acc, [key]: value }
          }, {})
        }
        resolve(parsedBody)
      } catch (error) {
        reject(new Error(`Error parsing body: ${error.message}`))
      }
    })

    req.on('error', error => {
      reject(new Error(`Error parsing body: ${error.message}`))
    })
  })
}
const setBodyProperty = async (req) => {
  const methodsWithBody = ['POST', 'PUT', 'PATCH'] // Add other methods as needed
  if (methodsWithBody.includes(req.method)) {
    try {
      const data = await getBody(req)
      req.body = data
    } catch (error) {
      console.log('Error parsing body', error.message)
    }
  }
}
module.exports = { setBodyProperty }

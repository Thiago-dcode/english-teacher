const { render } = require('../core/render.js')
const { authenticate } = require('../core/auth.js')
const authController = {

  index: async (req, res) => {
    return res.end(await render('login'))
  },
  login: async (req, res) => {
    const user = {
      username: 'thiago',
      password: '1234'
    }
    res.setHeader('Set-Cookie', 'cookie_1', 'my amazing cookie 1')
    // eslint-disable-next-line no-prototype-builtins
    if (!req.body.hasOwnProperty('username') && !req.body.hasOwnProperty('username')) {
      res.end(await render('login'))
    } else if (req.body.username !== user.username) {
      res.end(await render('login'))
    } else if (req.body.password !== user.password) {
      res.end(await render('login'))
    } else {
      await authenticate(user)
      res.end()
    }
  }

}

module.exports = {
  authController
}

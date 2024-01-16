const { render } = require('../core/render.js')
const { authorize } = require('../core/auth.js')
const authController = {

  index: async (req, res) => {
    return res.end(await render('login'))
  },
  login: async (req, res) => {
    const user = {
      id: 1,
      username: 'thiago',
      password: '1234'
    }
    const body = req.body
    console.log('BODY', body)
    // eslint-disable-next-line no-prototype-builtins
    if (!body.hasOwnProperty('username') && !body.hasOwnProperty('username')) {
      res.end(await render('login'))
    } else if (body.username !== user.username) {
      res.end(await render('login'))
    } else if (body.password !== user.password) {
      res.end(await render('login'))
    } else {
      await authorize(req, res, user, body.hasOwnProperty('remember-me'))
      res.end()
    }
  }
}

module.exports = {
  authController
}

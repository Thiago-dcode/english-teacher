const { render } = require('../core/bootstrap/render.js')
const { authorize, logOut } = require('../core/auth.js')
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
    // eslint-disable-next-line no-prototype-builtins
    if (!body.hasOwnProperty('username') && !body.hasOwnProperty('username')) {
      res.end(await render('login'))
    } else if (body.username !== user.username) {
      res.end(await render('login'))
    } else if (body.password !== user.password) {
      res.end(await render('login'))
    } else {
      await authorize(req, res, user, body.hasOwnProperty('remember-me'))
      res.redirect('/teacher')
    }
  },
  logout: async (req, res) => {
    await logOut(res)
    res.redirect('login')
  }

}

module.exports = {
  authController
}

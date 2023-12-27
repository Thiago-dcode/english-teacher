const { render } = require('../core/render.js')

const authController = {

  index: async (req, res) => {
    res.end(await render('login'))
  },
  login: async (req, res) => {
    const user = {
      username: 'thiago',
      password: '1234'
    }
    console.log('Login body:', req.body)
    if (!req.body.hasOwnProperty('username') && !req.body.hasOwnProperty('username')) {
      res.end(await render('login'))
    } else if (req.body.username !== user.username) {
      res.end(await render('login'))
    } else if (req.body.password !== user.password) {
      res.end(await render('login'))
    } else {
      res.redirect('/')
    }
  }

}

module.exports = {
  authController
}

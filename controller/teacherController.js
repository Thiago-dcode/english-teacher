const { render } = require('../core/render.js')

const teacherController = {

  index: async (req, res) => {
    res.end(await render('teacher'))
  }

}

module.exports = {
  teacherController
}

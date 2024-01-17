const homeController = {

  index: (req, res) => {
    res.render('/', {
      greetings: 'HELLO'
    })
  }

}

module.exports = {
  homeController
}

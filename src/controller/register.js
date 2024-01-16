const { homeController } = require('./homeController.js')
const { aboutController } = require('./aboutController.js')
const { postController } = require('./postController.js')
const { openAiController } = require('./openAiController.js')
const { teacherController } = require('./teacherController.js')
const { authController } = require('./authController.js')
const { storageController } = require('./storageController.js')

const controller = {

  get: (name) => {
    switch (name) {
      case 'home':
        return homeController
      case 'about':
        return aboutController
      case 'post':
        return postController
      case 'openAi':
        return openAiController
      case 'teacher':
        return teacherController
      case 'auth':
        return authController
      case 'storage':
        return storageController

      default:
        break
    }
  }
}

module.exports = { controller }

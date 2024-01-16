const controller = {
  get: (name, fn = 'index') => {
    try {
      const controllers = require(`../controller/${name}Controller.js`)
      return controllers[`${name}Controller`][fn]
    } catch (error) {
      console.error(`Error while loading controller '${name}':`, error.message)
      return null
    }
  }
}

module.exports = {
  controller
}

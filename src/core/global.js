const _global = {}

const global = {

  set: (key, value) => {
    _global[key] = value
  },
  get: (key) => {
    return _global[key]
  },
  exist: (key) => {
    return _global.hasOwnProperty(key)
  }
}

module.exports = {
  global
}

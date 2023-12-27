const fs = require('node:fs/promises')
const path = require('node:path')

const render = async (view) => {
  try {
    const _view = Array.isArray(view) ? view : [view]

    console.log('__dirname', _view)
    const html = await fs.readFile(path.join('views', ..._view, 'index.html'))
    return html
  } catch (error) {
    console.log(error.message)
    throw Error('Error rendering the view: ' + path.join('views', view, 'index.html'))
  }
}
const getAsset = async (folder, file) => {
  try {
    const asset = await fs.readFile(path.join('assets', folder, file + '.' + folder))
    return {
      data: asset
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}
module.exports = { render, getAsset }

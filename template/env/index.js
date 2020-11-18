const serverType = process.env.SERVER_TYPE

let userEnv = ''

switch (serverType) {
  case 'test':
    userEnv = require('./test')
    break
  case 'prod':
    userEnv = require('./prod')
    break
  default:
    userEnv = require('./local')
    break
}

module.exports = userEnv

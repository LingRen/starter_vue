const serverType = process.env.SERVER_TYPE

let userEnv = ''

switch (serverType) {
  case 'test':
    userEnv = require('./env_test')
    break
  case 'prod':
    userEnv = require('./env_prod')
    break
  default:
    userEnv = require('./env_local')
    break
}

module.exports = userEnv

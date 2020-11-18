const serverType = process.env.SERVER_TYPE

let user_env = ''

switch (serverType) {
  case 'test':
    user_env = require('./test')
    break
  case 'prod':
    user_env = require('./prod')
    break
  default:
    user_env = require('./local')
    break
}

export default user_env

require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/reads'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}

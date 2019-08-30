require('dotenv').config()

const port = process.env.PORT || 4001

// the NODE_ENV suffix to the database URL allow us to have 
// multiple MongoDB databases, depending on the node environment.
const dbURI = process.env.MONGODB_URI || process.env.MONGODB_URL + `-${process.env.NODE_ENV || 'dev'}`
const secret = process.env.SECRET || 'local-test'

module.exports = { port, dbURI, secret }

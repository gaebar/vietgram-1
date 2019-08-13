const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/han-solo${process.env.NODE_ENV || 'dev'}`
const secret = process.env.SECRET || 'hansolo'

module.exports = { port, dbURI, secret }

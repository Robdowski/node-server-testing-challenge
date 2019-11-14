const express = require('express')

const helmet = require('helmet')
const cors = require('cors')


const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

const instructorRouter = require('./instructors/instructor-router')
server.use('/api/instructors', instructorRouter)

module.exports = server
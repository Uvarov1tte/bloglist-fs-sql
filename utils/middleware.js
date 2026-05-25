
const jwt = require('jsonwebtoken')
const { Blog } = require('../models')
const { SECRET } = require('./config')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        return res.status(404).send({ error: 'Blog not found.' })
    }
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError' && error.message.includes('blog.title cannot be null')) {
        return res.status(400).json({ error: 'Blog title cannot be blank.' })
    } else if (error.name === 'SequelizeValidationError' && error.message.includes('blog.url cannot be null')) {
        return res.status(400).json({ error: 'Blog url cannot be blank.' })
    } else if (error.name === 'SequelizeValidationError' && error.message.includes('Validation isEmail on username failed')) {
        return res.status(400).json({ error: 'Username must be a valid email address' })
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = {
    blogFinder,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}
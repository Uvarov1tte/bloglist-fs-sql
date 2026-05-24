const { Blog } = require('../models')

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
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Blog title and url cannot be blank.' })
    }

    next(error)
}

module.exports = {
    blogFinder,
    unknownEndpoint,
    errorHandler,
}
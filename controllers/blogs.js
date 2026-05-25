const blogsRouter = require('express').Router()
const { blogFinder, tokenExtractor } = require('../utils/middleware')
const { Blog, User } = require('../models')

blogsRouter.get('/', async (req, res) => {
    const notes = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        }
    })
    console.log(blogs.map(n => n.toJSON()))
    res.json(blogs)
})

blogsRouter.get('/:id', blogFinder, async (req, res, next) => {
    try {
        if (req.blog) {
            res.json(req.blog)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url
    }

    try {
        const user = await User.findByPk(req.decodedToken.id) 
        const result = await Blog.create({ ...blog, userId: user.id, date: new Date() })
        console.log(result.toJSON())
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', blogFinder, async (req, res, next) => {
    const body = req.body
    try {
        const blog = req.blog
        blog.title = body.title
        blog.author = body.author
        blog.url = body.url
        blog.likes = body.likes
        await blog.save()
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', blogFinder, async (req, res, next) => {
    try {
        await blog.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter
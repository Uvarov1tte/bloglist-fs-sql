const blogsRouter = require('express').Router()
// const Blog = require('../mongo/models/blog')
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        return res.status(404).end()
    }
    next()
}

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(blogs.map(n => n.toJSON()))
    res.json(blogs)
})

blogsRouter.get('/:id', blogFinder, async (req, res) => {
    res.json(req.note)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url
    }

    const result = await Blog.create(blog)
    console.log(result.toJSON())
    res.status(201).json(result)
})

blogsRouter.put('/:id', blogFinder, async (req, res) => {
    const body = req.body
    const blog = req.blog
    // blog.title = body.title
    // blog.author = body.author
    // blog.url = body.url
    blog.likes = body.likes
    await blog.save()
    res.json(blog)
})

blogsRouter.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy()
    res.status(204).end()
})

module.exports = blogsRouter
const blogsRouter = require('express').Router()
// const Blog = require('../mongo/models/blog')
const { Blog } = require('../models')

blogsRouter.get('/', async (req, res) => {
    // const blogs = await Blog.find({}).populate('user')
    const blogs = await Blog.findAll()
    console.log(blogs.map(n => n.toJSON()))
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            // console.log(blog.toJSON())
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

blogsRouter.post('/', async (req, res, next) => {

    const body = req.body

    // if (!req.user) {
    //     return res.status(400).json({ error: 'userId missing or not valid' })
    // }

    // const user = req.user

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url
    }


    try {
        const result = await Blog.create(blog)
        // user.blogs = user.blogs.concat(result._id)
        // await user.save()
        console.log(result.toJSON())
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    try {
        const blog = await Blog.findByPk(req.params.id)
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

blogsRouter.delete('/:id', async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    try {
        await blog.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter
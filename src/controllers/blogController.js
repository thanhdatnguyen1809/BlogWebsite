const Blog = require('../models/Blog');

const blogController =  {
    async index(req, res) {
        try {
            const blogs = await Blog.find();
            res.render('index', { blogs: blogs });
        } catch(err) {
            console.log(err);
        }
    },

    async detail(req, res) {
        try {
            const detailBlog = await Blog.findById(req.params.id);
            res.render('detail', {blog: detailBlog});
        } catch(err) {
            console.log(err);
        }
    },

    // [GET] /blog/create
    create(req, res) {
        res.render('create');
    },

    // [POST] /blog/create
    async add(req, res) {
        try {
            var blog = await Blog.create(req.body);

            res.redirect(`/blog/${blog._id}`);
        } catch(err) {  
            console.log(err);
        }
    },

    // [GET] /blog/update
    async updatePage(req, res) {
        try {
            const blogDetail = await Blog.findById(req.params.id);
            res.render('update', {blog: blogDetail});
        } catch(err) {
            console.log(err);
        }
    },

    // [PUT] /blog/:id 
    async update(req, res) {
        try {
            await Blog.findByIdAndUpdate(req.params.id, req.body);
            res.redirect(`/blog/${req.params.id}`);
        } catch(err) {
            console.log(err);
        }
    },

    //[DELETE] /blog/:id
    async delete(req, res) {
        try {
            await Blog.findByIdAndDelete(req.params.id);
            res.redirect('/blog');
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = blogController;
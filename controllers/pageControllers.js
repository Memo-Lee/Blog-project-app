const Post = require('../models/Post');
const Project = require('../models/Project');

exports.getPostEditPage = async (req,res) => {
    const post = await Post.findOne({_id:req.params.id});
    res.render('postedit',{
        post
    });
}

exports.getProjectEditPage = async (req,res) => {
    const project = await Project.findOne({_id:req.params.id});
    res.render('projectedit',{
        project
    });
}

exports.getPostPage = async (req, res) => {
    const posts = await Post.find({});
    res.render('posts',{
        posts
    });
}

exports.getProjectPage = async (req, res) => {
    const projects = await Project.find({});
    res.render('projects',{
        projects
    });
}

exports.getAboutPage = (req, res) => {
    res.render('about')
}

exports.getPostAddPage = (req, res) => {
    res.render('addpost')
}

exports.getProjectAddPage = (req, res) => {
    res.render('addproject')
}
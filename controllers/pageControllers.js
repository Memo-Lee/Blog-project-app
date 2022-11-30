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
    
    const page = req.query.page || 1;
    const PostPerPage = 2;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find({})
    .sort('-dateCreated')
    .skip((page-1)*PostPerPage)
    .limit(PostPerPage)
    res.render('posts',{
        posts,
        current : page,
        pages : Math.ceil(totalPosts/PostPerPage)
    })
    
    // const posts = await Post.find({});
    // res.render('posts',{
    //     posts
    // });
}

exports.getProjectPage = async (req, res) => {
    
    const page = req.query.page || 1;
    const ProjectPerPage = 3;
    const totalProjects = await Project.find().countDocuments();
    const projects = await Project.find({})
    .sort('-dateCreated')
    .skip((page-1)*ProjectPerPage)
    .limit(ProjectPerPage)
    res.render('projects',{
        projects,
        current : page,
        pages : Math.ceil(totalProjects/ProjectPerPage)
    })
    
    // const projects = await Project.find({});
    // res.render('projects',{
    //     projects
    // });
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
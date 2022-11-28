const Post = require('../models/Post');
const Project = require('../models/Project');
const fs = require('fs');

exports.getAllProjects = async (req, res) => {
    const posts = await Post.find({}).sort('-dateCreated'); 
    const projects = await Project.find({}).sort('-dateCreated');
    res.render('index',{
        posts,
        projects
    });
}

exports.getProject = async (req,res)=>{
    const project = await Project.findById(req.params.id);
    res.render('projectdetails',{
        project
    });
}

exports.createProject = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Project.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        })
    });
    res.redirect('/');
}

exports.updateProject = async (req,res)=>{
    const project = await Project.findOne({_id:req.params.id})
    project.title = req.body.title
    project.description = req.body.description
    project.save();

    res.redirect(`/projects/${req.params.id}`);
}

exports.deleteProject = async (req,res) => {
    const project = await Project.findOne({_id:req.params.id});
    let deletedImage = __dirname + '/../public' + project.image;
    fs.unlinkSync(deletedImage);
    await Project.findByIdAndRemove(req.params.id);
    res.redirect('/');
}
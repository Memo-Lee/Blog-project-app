const Post = require('../models/Post');
const fs = require('fs');

exports.getPost = async (req,res)=>{
    const post = await Post.findById(req.params.id);
    res.render('postdetails',{
        post
    });
}

exports.createPost = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Post.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name,
        })
    });
    res.redirect('/');
}

exports.updatePost = async (req,res)=>{
    const post = await Post.findOne({_id:req.params.id})
    post.title = req.body.title
    post.description = req.body.description
    post.save();

    res.redirect(`/posts/${req.params.id}`);
}

exports.deletePost = async (req,res) => {
    const post = await Post.findOne({_id:req.params.id});
    let deletedImage = __dirname + '/../public' + post.image;
    fs.unlinkSync(deletedImage);
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
}
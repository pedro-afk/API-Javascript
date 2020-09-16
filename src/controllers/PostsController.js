const User = require('../models/User');
const Post = require('../models/Posts');


module.exports = {
    async delete(req,res){
        try {
            const { id } = req.params;
            const { token } = req.headers.authorization;
    
            await Post.deleteOne().where('_id', id)
    
            return res.status(200).json({ message: 'Post deletado!'});
        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async update(req,res) {
        const { id } = req.headers;
        const { token } = req.headers.authorization;
        const { title, content } = req.body;
        const { filename } = req.file;

        try {
            await Post.updateOne({
                title,
                content,
                thumbnail: filename               
            }).where('_id', id);

            return res.status(200).json({message: 'Post atualizado!'});

        } catch (error) {
            return res.status(400).json(error);
        }

    },

    async show(req,res){ //listar os posts por id de cada usuário
        try {
            const { user_id } = req.headers;

            const post = await Post.find({ user: user_id });

            return res.status(200).json(post);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async index(req,res){ //listar todos os posts
        try {
            const post = await Post.find();

            return res.status(200).json(post);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async create(req,res) {
        const { user_id } = req.headers;
        const { token } = req.headers.authorization;
        const { title, content } = req.body;
        const { filename } = req.file;

        try {
            const user = await User.findById(user_id);

            if(!user){
                return res.status(401).json({ message: 'Usuário não existe!' });
            }
    
            const post = await Post.create({
                user: user_id,
                title,
                content,
                thumbnail: filename
            });

            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json(error);
        }

    }
};
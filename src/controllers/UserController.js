const User = require('../models/User');

module.exports = {

    async update(req,res){
        const { id } = req.headers;
        const { name, email } = req.body;

        try {
            await User.updateOne({
                name, 
                email, 
            }).where('_id', id);

            return res.status(201).json({ message: 'User updated!' });
        } catch (error) {
            return res.status(400).json(error);
        }
    },


    async index(req,res){
        try {
            const user = await User.find();
            return res.json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

};
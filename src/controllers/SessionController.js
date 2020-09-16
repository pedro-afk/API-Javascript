const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/authConfig.json');

module.exports = {
    async store(req,res) {
        const { email, pass } = req.body;

        try {
            const user = await User.findOne({email})
                .select('+pass')
    
            if(!user){
                return res.status(400)
                .json(
                    { 
                        message: 'Usuário não cadastrado! Cadastre-se!' 
                    }
                )
            }
    
            if(!await bcrypt.compareSync(pass, user.pass)){
                return res.status(401).json({ message: 'Senha Inválida!'})
            }
    
            user.pass = undefined;
    
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            });
    
            return res.status(200).json({user, token});
        } catch (error) {
            return res.status(401).json(error);
        }   

    },

    async create(req,res){
        const { 
            name, 
            email, 
            pass 
        } = req.body;

        try {
            const user = await User.create({
                name, 
                email, 
                pass, 
            });
            //não exibir a senha quando o usuário se registrar
            user.pass = undefined;

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }

    }
}
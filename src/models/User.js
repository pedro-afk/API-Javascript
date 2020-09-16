const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    pass: String,
    
    created_at: {
        type: Date,
        default: Date.now
    }
});

//criptografando a senha do usuário com o bcryptjs
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
});


module.exports = model('Users', UserSchema)
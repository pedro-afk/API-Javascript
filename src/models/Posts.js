const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'        
    },
    
    title: String,
    content: String,
    thumbnail: String
},  {
        toJSON: {
            virtuals: true
        }
    });

    PostSchema.virtual('thumbnail_url').get(function() {
        return `http://localhost:3000/files/${this.thumbnail}`
    });

module.exports = model('Posts', PostSchema);
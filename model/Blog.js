const { Schema, model} = require("mongoose");

const BlogSchema = new Schema({
    title:{
       type : String,
       required : true
    },
    body :{
        type : String,
        required: true
    },
    coverImageUrl : {
        type : String,
        required : false
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
},{timestamps : true})

const BLOG = model('blog',BlogSchema)

module.exports = BLOG
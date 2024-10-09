const { Schema, model} = require("mongoose");

const commentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : "user",
    },
    BlogId : {
        type : Schema.Types.ObjectId,
        ref :'blog',
    } 
},{timestamps:true})

const Comments = model('comments' , commentSchema)
module.exports = Comments
const mongoose= require('mongoose');

const recipeschema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
    },
    ingredients:{
        type:String,
        required: true,
        trim:true,

    },
    Description:{
        type:String,
        required: true,

    }
},{timestamps:true});



module.exports=mongoose.model('recipe',recipeschema);
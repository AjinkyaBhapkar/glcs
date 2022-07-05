const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const glSchema=new Schema({
    ticker:{
        type:String,
        required:true
    },
    change:{
        type:Number,
        required:true
    }
},{timestamps:true,}
);

const GL =mongoose.model('gainer-loser',glSchema);
module.exports=GL;
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const liveSchema=new Schema({
    
    live:[{}]

},{timestamps:true,}
);

const Live =mongoose.model('live',liveSchema);
module.exports=Live;
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const glSchema=new Schema({
    
    gainer:[{}],
    looser:[{}]

},{timestamps:true,}
);

const GL =mongoose.model('gainer-loser240',glSchema);
module.exports=GL;
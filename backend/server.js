const express =require('express')
const cors =require('cors')
const mongoose=require('mongoose');
const {save2DB} =require('./cron_functions/cron15')
const {save2402DB} =require('./cron_functions/cron240')
const cron = require('node-cron')
const path=require('path')

require('dotenv').config();

const port=process.env.PORT||5000;

const app=express();
app.use(cors());
app.use(express.json())

const uri =process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connected!!!");
})

const glRouter=require('./routes/gl')
app.use('/gl',glRouter)

cron.schedule('14,29,44,59 0-23 * * *',save2DB,{scheduled:true,timezone:"Asia/Kolkata"});
cron.schedule('29 1,5,9,13,17,21 * * *',save2402DB,{scheduled:true,timezone:"Asia/Kolkata"});


app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});


app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})






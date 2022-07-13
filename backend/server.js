const express =require('express')
const cors =require('cors')
const mongoose=require('mongoose');
const {save2DB} =require('./cron_functions/cron')
const cron = require('node-cron')

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

cron.schedule('* * * * *',save2DB);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})






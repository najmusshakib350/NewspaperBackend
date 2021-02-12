const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config({
    path: './config.env'
});

const DB= process.env.DATABASE.replace('<PASSWORD>', password => process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(() =>{
    console.log("connection is succesfully..");
}).catch((err) =>{
    //console.log("Database connection is unsuccesfully..");
})

const app=require('./app');

const port=process.env.PORT;

app.listen(port, ()=>{
    console.log("This port number is ", port);
});



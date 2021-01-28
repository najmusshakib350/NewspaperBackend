const path=require('path');

const express=require('express');
const cookieParser=require('cookie-parser');
const ratelimit=require('express-rate-limit');
const helmet=require('helmet');
const mongosanitize =require('express-mongo-sanitize');
const xss=require('xss-clean');
//const compression=require('compression');
const categoryRoutes=require('./route/categoryroutes');
const globalerr=require('./controller/errcontrolles');
const AppError=require('./utils/apperror');
const postRoutes=require('./route/postroutes');
const viewroutes=require('./route/viewroutes');
const userRoutes =require('./route/usersrouters');
const commentRoutes =require('./route/commentroutes');


const app=express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

const limiter=ratelimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too many requests from this ip, Please try again in an hour...!"
});

app.use('/', limiter);

app.use(express.json());
app.use(cookieParser());

app.use(mongosanitize());
app.use(xss());

//app.use(compression());

app.use('/', viewroutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);


app.all('*', (req,res,next) =>{
    next(new AppError(`can not findout this url: ${req.originalUrl}`, 404));
});

app.use(globalerr);
module.exports=app;
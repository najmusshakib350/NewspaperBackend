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
    max:10000,
    windowMs:60*60*1000,
    message:"Too many requests from this ip, Please try again in an hour...!"
});

app.use('/', limiter);

app.use(express.json());
app.use(cookieParser());

app.use(mongosanitize());
app.use(xss());




// Add headers
app.use(function (req, res, next) {
    //please follow this part for better understanding this part
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  
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
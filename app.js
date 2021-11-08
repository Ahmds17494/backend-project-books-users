require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookie =require('cookie-parser');
const JWT = require('jsonwebtoken');
const User =require('./model/userModel')

const app = require('express')()
const PORT = process.env.PORT || 5000 ; 
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

const {connection  } = require('./config/db')
connection();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookie());




app.use(async( req ,res , next )=>{
    const token = req.cookies.token ; 
    console.log(token)
    if ( token ){

        try {
            
            const { userId , exp }= JWT.verify(token ,  process.env.JWTKey)
            if ( exp < Date.now().valueOf() /1000  ){
                return res.status(401).json({
                    error:'you have to loggin in again jwt token has been expired '
                })
            }
            const user = await User.findById(userId);
            res.locals.loggedInUser = user ;
            console.log(res.locals.loggedInUser); 
            next()
        } catch (error) {
            if ( error instanceof JWT.JsonWebTokenError ){
                return res.status(401).json({
                    error:'you have to loggin in again'
                })
            }
            return res.status(500).json({
                    error : error.message
            })
        }  
    // end of the of statement
    }else{
        console.log('no Token');
        next();
    }
})


app.use('/api' , bookRoutes)
app.use('/api' , userRoutes)

app.listen(PORT,()=>{ console.log('server is running on port : ' ,PORT );})






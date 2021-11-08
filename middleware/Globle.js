const JWT = require('jsonwebtoken')
const ac = require('accesscontrol');
const { role } =require('./../roles/role')

exports.grantAccess=(action , resource)=>async(req, res , next)=>{
    try {
        console.log(req.user)
        const permission = role.can(req.user.role)[action](resource)
        if ( !permission.granted ){
                return res.status(403).json({
                        error:'you don\'t have enough permission to preform this action'
                })
        }

        next();

    } catch (error) {
        next(error)
    }
}


exports.AllowIfLoggedIn= async(req ,res ,next )=>{
        try {
            const  user  = res.locals.loggedInUser
            if (!user){
               return res.status(401).json({ error :'you have to loggin again '})
            }
            req.user = user ; 
            next();
        } catch (error) {
            next(error)
        }
}
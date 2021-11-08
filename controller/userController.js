const User = require('./../model/userModel');

const bcrypt = require('bcrypt'); 
const JWT = require('jsonwebtoken'); 


async  function hashPassword(pass){
    return await bcrypt.hash(pass, 10 ); 
}

async  function ValidatePassword(pass , hashedPass ){
    return await bcrypt.compare(pass, hashedPass ); 
}



exports.signup = async(req , res )=>{
        try {   
            const {email , password, role , name, contactNum } = req.body ; 
            console.log(role)
            const user = await User.findOne({email});
            if ( user ){
                return res.status(400).json({
                        error:'Email is already exist'
                })
            }
            const hashedPass = await hashPassword(password)
            
            const newUser = new User({
                   
                    email , 
                    password :hashedPass,
                    role,
                    name,
                    contactNum,
            })

            const savedUser = await newUser.save();

            return res.status(200).json({
                    data:savedUser , 
            })

        } catch (error) {
            return res.status(500).json({
                error :'Server Error '+ error.message
            })
        }
}




exports.login = async(req , res )=>{
    try {   
        const { email , password } = req.body ; 
        const user = await User.findOne({email});
        if ( !user ){
            return res.status(401).json({
                    error:'Email is not exist'
            })
        }
        const validatePss = await ValidatePassword(password , user.password )
        if ( !validatePss ){
            return res.status(401).json({
                error:'Invalid Password'
                })
        }
        

        const token = JWT.sign({userId : user._id, role:user.role} ,
                                process.env.JWTKey , 
                                {'algorithm' : 'HS256' , expiresIn : 300 })
        
        res.cookie('token',token,{maxAge :  300 *1000 })

 
        return res.status(200).json({
                data:{email:user.email, role : user.role } , 
                token
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}



exports.getUsers = async(req , res )=>{
    try {   
      
        const users = await User.find();

        if ( !users.length ){
            return res.status(404).json({
                    error:'Users not found'
            })
        }
        return res.status(200).json({
                data:users
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}



exports.getUser = async(req , res )=>{
    try {   
      
        const { userId } = req.params;
        const user = await User.findById(userId);

        if ( !user ){
            return res.status(404).json({
                    error:'User not found'
            })
        }
        return res.status(200).json({
                data:user
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


exports.updateUser = async(req , res )=>{
    try {   
        const  {role }= req.body ;
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId,
                {role });

        if ( !user ){
            return res.status(404).json({
                    error:'User not found'
            })
        }

        const updatedUser = await User.findById(userId);
        return res.status(200).json({
                data:updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


exports.DeleteUser = async(req , res )=>{
    try {   
      
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if ( !user ){
            return res.status(404).json({
                    error:'User not found'
            })
        }
        return res.status(200).json({
                data:0,
                msg:'User has been deleted'
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


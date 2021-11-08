const Router = require('express').Router();
const Controller =require('./../controller/userController')

const { AllowIfLoggedIn , grantAccess  } =require('./../middleware/Globle')

Router.post('/signup',Controller.signup ) 

Router
    .route('/users')
        .get(AllowIfLoggedIn,grantAccess('readAny' , 'profile'), Controller.getUsers)
        // .post(Controller.signup)

Router.post('/login',Controller.login )


Router
    .route('/user/:userId')
        .get(AllowIfLoggedIn,grantAccess('readOwn' , 'profile'), Controller.getUser)
        .put(AllowIfLoggedIn,grantAccess('updateAny' , 'profile'),Controller.updateUser )
        .delete(AllowIfLoggedIn,grantAccess('deleteAny' , 'profile'),Controller.DeleteUser)



module.exports = Router; 
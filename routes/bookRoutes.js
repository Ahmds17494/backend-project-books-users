const Router = require('express').Router();
const Controller =require('./../controller/bookController')

const { AllowIfLoggedIn , grantAccess  } =require('./../middleware/Globle')

Router
     .route('/addBook') 
        .post(AllowIfLoggedIn,grantAccess('create' , 'profile'), Controller.addBook)

Router
    .route('/books')
        .get(AllowIfLoggedIn,grantAccess('readOwn' , 'profile'), Controller.getBooks)

            
Router
    .route('/book/:bookId')
        .get(AllowIfLoggedIn,grantAccess('readOwn' , 'profile'), Controller.getBook)
        .put(AllowIfLoggedIn,grantAccess('updateOwn' , 'profile'),Controller.rateBook )
        .put(AllowIfLoggedIn,grantAccess('updateAny' , 'profile'),Controller.updateBook )
        .delete(AllowIfLoggedIn,grantAccess('deleteAny' , 'profile'),Controller.DeleteBook)
       
       
 module.exports = Router; 



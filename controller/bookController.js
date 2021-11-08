const Book = require('./../model/bookModel');

exports.addBook = async(req , res )=>{
    try {   
        const {title, author, price , rate} = req.body ; 
        const book = await Book.findOne({title});
        if ( book ){
            return res.status(400).json({
                    error: title + ' is already exist '
            })
        }
        
        
        const newBook = new Book({
               
               title,
               author,
               price,
               rate
        })

        const savedBook = await newBook.save();

        return res.status(200).json({
                data:savedBook , 
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


exports.getBooks = async(req , res )=>{
    try {   
      
        const books = await Book.find();

        if ( !books.length ){
            return res.status(404).json({
                    error:'Books not found'
            })
        }
        return res.status(200).json({
                data:books
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}



exports.getBook = async(req , res )=>{
    try {   
      
        const { bookId } = req.params;
        const book = await Book.findById(bookId);

        if ( !book ){
            return res.status(404).json({
                    error:'Book not found'
            })
        }
        return res.status(200).json({
                data:book
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


exports.DeleteBook = async(req , res )=>{
    try {   
      
        const { bookId } = req.params;
        const book = await Book.findByIdAndDelete(bookId);

        if ( !book ){
            return res.status(404).json({
                    error:'Book not found'
            })
        }
        return res.status(200).json({
                data:0,
                msg:'Book has been deleted'
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}


exports.updateBook = async(req , res )=>{
    try {   
        const  {price }= req.body ;
        const { bookId } = req.params;
        const book = await Book.findByIdAndUpdate(bookId,
                {price});

        if ( !book ){
            return res.status(404).json({
                    error:'Book not found'
            })
        }

        const updatedBook = await Book.findById(bookId);
        return res.status(200).json({
                data:updatedBook
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}

exports.rateBook = async(req , res )=>{
    try {   
        const  {rate}= req.body ;
        const { bookId } = req.params;
        const book = await Book.findByIdAndUpdate(bookId,
                {rate});

        if ( !book ){
            return res.status(404).json({
                    error:'Book not found'
            })
        }

        const updatedBook = await Book.findById(bookId);
        return res.status(200).json({
                data:updatedBook
        })

    } catch (error) {
        return res.status(500).json({
            error :'Server Error '+ error.message
        })
    }
}
const mongoose = require('mongoose');


exports.connection= async()=>{
        try {
            const conn = mongoose.connect(process.env.MONGODB_URI)
            console.log('MongoDB connected ' + mongoose.connection.host )

        } catch (error) {
            if ( error ) throw error.message
            
        }
}

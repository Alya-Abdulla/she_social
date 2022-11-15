const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Creating our event Schema
const ConfirmedModel = new Schema ({
    Confirmation:{type:Boolean, require: true},

    //Associate the user model
    User: [{type: Schema.Types.ObjectId ,
        ref: 'User'
    }],
       //Associate the user model
    Host: [{type: Schema.Types.ObjectId ,
        ref: 'User'
    }],
    //Associate the Event model
    Event: {type: Schema.Types.ObjectId ,
        ref: 'Event'
    }
   
    
}, {
    timestamps: true
})

//Storing our Schema as a model 
const Confirmed = mongoose.model('Confirmed', ConfirmedModel)


//Exporting our Model 
module.exports = Confirmed


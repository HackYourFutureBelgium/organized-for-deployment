const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 32,
        required:[true, 'Name field is required']
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 32,
        required:[true, 'Last name field is required']
    },
    email :{
        type : String,
        required : true,
        min : 6,
        max : 15
    },
    
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user','admin', 'school'],
        required: true
    },
    address: {
        postcode: {
            type: Number,
            required: [true, 'Post code is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        street: {
            type: String,
            required: [true, 'Street is required']
        },
        building: {
            type: Number,
            required: [true, 'Building No is required']
        },

    },
    listOfSchools : [{type : mongoose.Schema.Types.ObjectId, ref: 'School'}],
    date: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch, { message: 'Password incorrect! Please try again.' });
            return cb(null,this);
        }
    });
}

UserSchema.methods.isValidPassword= async function(password){
        const compare = await bcrypt.compare(password, this.password);
        console.log(compare);
        return compare;
}


module.exports = mongoose.model('User',UserSchema);
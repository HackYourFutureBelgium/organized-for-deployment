const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/School');
const { validRegister, validLogin, forgotPasswordValidator, resetPasswordValidator} = require('../helpers/valid')
const {errorHandler} = require('../helpers/dbErrorHandler');
const { validationResult} = require('express-validator');

const signToken = userID =>{
    return JWT.sign({
        iss : "iSchool",
        sub : userID
    },process.env.JWT_SECRET,{expiresIn : "7d"});
}

userRouter.post('/register',validRegister,(req,res)=>{
    const { email,firstName,lastName, address, password,role } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({email},(err,user)=>{
            if(err)
                res.status(500).json({error: "Error has occurred"});
            if(user)
                res.status(400).json({error: "Email already exists"});
            else{
                const newUser = new User({firstName, lastName,email, password,role, address});
               
                newUser
                    .save()
                    . then(user => {
                        res.status(201).json({
                            success: true,
                            user: user,
                            message: 'Account successfully created'
                        });
                    })
                    .catch(err =>  
                        {console.log(err);
                        res.status(500).json({error :`Something went wrong, please try again`})}
                        );
            }
        });
    }
});

userRouter.post('/login',validLogin, async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        console.log(info);
        if(err || !user){
          return res.json({error: `${info.message}`})
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const {_id, email, role} = user
          //Sign the JWT token and populate the payload with the user email and id
          const token = signToken(_id);
          
          //Send back the token to the user
          return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
          res.status(200).json({isAuthenticated : true,user : {email,role}, message: `${info.message}`});
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});


userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {email,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email,role}});
});





module.exports = userRouter;
const {User,Profile} = require('../models');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const {userRegisterSchema} = require('../validations/uservalidation');
const logger = require('../middleware/publicmiddleware/winston');
const profile = require('../models/profile');

/**
 * @author: Jitendra jangid
 * @function: Register new users
 * @param: username,fullname,password,email
 */
const registerUser = async(req,res) => {
    try{      
      const validatedUser = await userRegisterSchema.validateAsync(req.body, { abortEarly: false });
      const {username, password,fullname, email } = validatedUser
      const data = await User.create({
          username: username,
          password: password,
          fullname: fullname,
          email : email,
          profile : profile
        }) 

      res.status(201).json({
        status:201,
        message: "Data is created successfully",
        data: data
      })
      
    }catch(err){
      // if (err instanceof Sequelize.ValidationError) {
      //   const errors = err.errors.map(error => ({
      //     field: error.path,
      //     message: error.message
      //   }));
      //   res.status(400).json({ errors });
      // }
      console.error("errors==>>", err.message);
      // console.error("errors==>>", err.message);
      res.status(409).json({
        status: 409,
        message: err.message
      })
    }

}

/**
 * @author: Jitendra jangid
 * @function: Login user
 * @param: email and password
 */
const loginUser = async (req, res) => {
    try{    
      res.status(200).json({
        status:200,
        message: "Logined Successful",
        token : req.token
      })

    }catch(err){
      res.status(400).json({ status:400,error: err.message });
    }
  };

/**
 * @author: Jitendra jangid
 * @function: Finding all existing users
 */
const getAllUsers = async (req,res) => {
  try{
    const users = await User.findAll({
      order:[['fullname', 'ASC']],
      attributes: ['username','fullname','email'],
    });
    if(users){
      res.status(302).json({
        status:302,
        message: "Users found",
        data: users
      })
    }
  }catch(err){
    res.status(400).json({ status:400,error: err.message });
  }
}

/**
 * @author: Jitendra jangid
 * @function: Update login user details
 */
const putUpdate = async (req,res) => {
  try{
    const data  = await User.findOne({
      where:{
        id:req.user.id
      }
    })

    data['username'] = req.query.username;
    data['email'] = req.query.email;

    await data.save();    

  }catch(err){
    console.error("error", err);
    res.status(400).json({ status:400,error: err.message });
  }
}

/**
 * @author: Jitendra jangid
 * @function: Create new profile of login user
 */
const profileUpload = async (req,res) => {
  try{
    const profile = await Profile.create({
      userId : Number(req.user.id),
      profile : req.file.filename
    })
    res.status(200).json({status:200,message:"Profile created successfully",data:profile})
  }catch(err){
    logger.error("error==>",err);
    res.status(400).json({ status:400,error: err.message });
  }
}


module.exports = { loginUser, registerUser, getAllUsers, putUpdate, profileUpload };
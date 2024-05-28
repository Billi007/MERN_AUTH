import { USER } from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const test = async (req, res) => {
  res.send("success");
};

//generate Access Token 
const generateAccessToken = async (req, res) => {
  const {email, userName} = req.body
  jwt.sign({
    _id: req.body.userId,
   email: email,
   userName: userName,
  },
  process.env.jwt_secret,
  {
    expiresIn: "1d"
  }
)}
//generate refresh Token 
const generateRefreshToken = async (req, res) => {
  jwt.sign({
    _id: req.body.userId,
  },
  process.env.jwt_secret,
  {
    expiresIn: "10d"
  }
)}

//Register
const register = async(req, res) => {
  try {
    const {userName, email, password} =  req.body

    //checking if all fields are correct
     if(!(userName && email && password))
       return res.json({
      status : "Failed",
      error: "all fields are required."
     })

     if(!password || password < 6)
      if(!(userName && email && password))
        return res.json({
       status : "Failed",
       error: "all fields are required."
      })
      
    //check if user already exists.
    const existingUser = await USER.findOne({email})
    if(existingUser) {
      return res.json({
       status : "Failed",
       error: "email already exists."
      })
    }


    //hashing password
    const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10)
    }
    
    const hashPassword = await hashedPassword(password)


   //creating user for db
   const user = await USER.create({
    userName,
    email,
    password: hashPassword
   })
 
   res.status(200).json({
    user,
    message : "user registered successfully."
   })


  } catch (error) {
    console.log(error)
    res.status(401).json({
      error: "something went wrong while resgitering the user.",
      message: error.message
    })
  }
}

//LOGIN 
const login = async(req, res) => {
const {email, password} =  req.body

 //checking if all fields are correct
try {
  if(!(email && password)){
    res.json({
      status : "Failed",
      error: "all fields are required."
    })
  }
  
   //find user
   const user = await USER.find({email}) 
   if(!user){
    res.json({
      status : "Failed",
      error: "No user found."
    })
   }
  
   //password check
   const encryptPassword = async(password) => {
    return await bcrypt.compare(password, req.body.password)
   }
  
   if(!encryptPassword){
    res.json({
      status : "Failed",
      error: "Incorrect Password."
    })
   }

   //JasonwebToken
   const token =  jwt.sign({
    id: user.id,
    email: user.email,
    userName: user.userName
   },
   process.env.jwt_secret,
   {}
  )

  const options = {
    httpOnly : true ,
    secure : true
  }
   res.cookie('token', token, options)
   res.status(200).json({
    user,
    message : "user logged in successfully."
   })
   
} catch (error) {
  console.log(error)
  res.status(501).json({
    error: "something went wrong while login.",
    message: error.message
  })
}

}

const getProfile = async(req, res) => {
  try {
    const {token} = req.cookies
    if(!token){
      res.json({
        status : "Failed",
        error: "Unauthorized Token."
      })
    }
  
   const verfiyToken = jwt.verify(token, process.env.jwt_secret, {})

   res.json(verfiyToken)
   
  } catch (error) {
    console.log(error)
    res.status(401).json({
    message : "Invalid Token."
   })
  }
}

export { register, test, login, getProfile };

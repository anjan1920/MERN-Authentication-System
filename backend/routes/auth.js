import express from 'express'
import User from '../models/User.js'
import {protect} from "../middleware/auth.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("Register post hit..");

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    console.log(`${username}, ${email}`);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("User not exists..");

    
    const user = await User.create({
      username,
      email,
      password: password,
    });

    console.log("User created");

    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});




router.post('/login',async (req,res)=>{
    console.log("Login post hit...");
    
    const {email ,password} = req.body;
    try{
        if( !email || !password){
            console.log("No password or email given.");
            
            return res.status(400)
            
            .json({
                message :"Please fill all the fields"
            })
        }
        //find user in db
        console.log(`user email ${email}`);
        
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          console.log("Invalid user ");
          
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          console.log("Password mismatch");
          
          return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log("Password or user is valid.");
        console.log("Generating JWT token");
        
        
        const token = generateToken(user._id);
        res.status(200).json({
            id:user._id,
            username :user.username,
            email:user.email,
            token,
    

        })

        
    } catch (error) {
         res.status(500).json({message:"Server error"})
    }
})



router.get('/me',protect,async (req,res)=>{
    res.status(200).json(req.user)
});
//this function is protected my middleware
//here the middle ware job
// if token is valid then its load the user from db then
//then add it in req.user


//generate jwt tokens
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export default router;
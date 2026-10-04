import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";


const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


const register = async(req ,res) =>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required!"});
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email: email.toLowerCase() }] });
        if(existingUser){
            return res.status(409).json({message:"User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({
            token: createToken(user._id),
            user: { id: user._id, username: user.username, email: user.email },
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Couldn't register."});
    }
}



const login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and password are required!"});
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        // same message for both cases so nobody can probe which emails exist
        if(!user){
            return res.status(401).json({message:"Invalid email or password."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password."});
        }

        res.json({
            token: createToken(user._id),
            user: { id: user._id, username: user.username, email: user.email },
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Couldn't log in."});
    }
}


export { register, login };

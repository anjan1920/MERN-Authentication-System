import User from "../models/User.js";
import jwt from 'jsonwebtoken'


export const protect = async (req, res, next) => {
    console.log("me post hit..");


    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        //Authorization:[Bearer, <token>] <-- we get this

        const token = authHeader.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //now req.user obj have all info of the user from db except password
        req.user = await User.findById(decoded.id).select("-password")

        return next();//continue 
    } catch (error) {
        console.log("Token verification failed ", error.message);
        return res.status(401).json({ message: "Not authorized ,token failed" })


    }




}
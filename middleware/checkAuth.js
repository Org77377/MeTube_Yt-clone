import jwt from "jsonwebtoken";

export async function checkAuth(req, res, next){
    try{
        // console.log(req.headers.authorization.split(" ")[1])
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(500).json({msg:"Please login"});
        }
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    
    }catch(error){
        // console.log(req.headers)
        return res.status(403).json({"msg" : "Please Login"})
    }
} 
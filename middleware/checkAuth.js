import jwt from "jsonwebtoken";

export async function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(token === ' '){
            res.json("Please login");
        }
        const valid = jwt.verify(token, process.env.JWT_SECRET);
        next();

    }catch(error){
        res.status(500).json({msg: "Invalid Credentials"})
    }
} 
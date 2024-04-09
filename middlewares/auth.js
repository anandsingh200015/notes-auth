const jwt = require("jsonwebtoken");
const SECRET_KEY = "JUSTforTesting";

const auth = (req,res,next)=>{
    try{
    let token = req.headers.authorization;
    if(token){
        token = token.split(" ")[1];
        let user = jwt.verify(token, SECRET_KEY);
        req.userId = user.id;
    }
    else{
        return res.status(401).json({message:"Invalid token. 1"});
    }
    next();
}

catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
}
}

module.exports = auth;
const jwt=require('jsonwebtoken')
const JWT_SECRET = 'Using JWT Token'


const verifyToken = (req, res, next) => {
    // const token = req.headers['token']
    const token = req.header('Authorization');

    if (!token) return res.status(400).json({ message: 'No token provided' });
  
  try{
    const verify= jwt.verify(token,JWT_SECRET)
    req.user = verify
    next()
    }catch(err){
        return res.status(401).json({ message: 'Invalid token' });
        
     }
////
    //  const token=req.header('authorization')
    // //if token not present
    // if(!token){
    //     res.statusCode=401
    //     const response = {
    //         "message":"Send the Token"
    //     }
    //     res.set({
    //         "Content-Type":"application/json"
    //     })
    //     res.send(response)

    // }else{

    //     //if token is present
    //     //verify jwt token
    //     jwt.verify(token,JWT_SECRET,function(err,jwt_decoded){
    //         if(err){
    //            if(err.name =="TokenExpriredError"){
    //             res.statusCode=401
    //             const response = {
    //                 "message":"Token is exprired"
    //             }
    //             res.set({
    //                 "Content-Type":"application/json"
    //             })
    //             res.send(response)
    //            }else{
    //             res.statusCode=401
    //             const response = {
    //                 "message":"Token is invalid"
    //             }
    //             res.set({
    //                 "Content-Type":"application/json"
    //             })
    //             res.send(response)
    //            }
                
    //         }else{
    //             res.locals=jwt_decoded
    //             next()
    //         }
    //     })
    // }
  };


  
module.exports = verifyToken
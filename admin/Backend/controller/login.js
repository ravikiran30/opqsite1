const express = require("express")
const connection =require("../mysql/mysql.js")
const error_handler = require("./error_handler.js")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")

const login = function(req, res){
    const admin_email = req.body.admin_email
    const frontend_admin_password = req.body.admin_password
   

    const admin_query = "select * from opqadmin where admin_email=?"
    connection.query(admin_query,[admin_email],function(err,result){
        if(err){
            error_handler(err,req,res,400)
        }else{
            if(result.length==0){
                return res.status(400).json({message:"Email not found"})
            }else{
                
                const storedHashedPassword = result[0].admin_password;

                if(frontend_admin_password==storedHashedPassword){
                    //jwt 
                    console.log(result)
                    const payload={
                        "admin_email":result[0].admin_email,
                        "admin_name": result[0].admin_name
                    }

                    //jwt sign
                    const jwt_token=jwt.sign(payload,"Using JWT Token",{expiresIn:'2d'})
                    res.cookie("admin_token",jwt_token,{
                        maxAge:3600,
                        httpOnly:true,
                        //secure:true
                        domain:"localhost",
                        sameSite:"lax"
                    })
                    express.response={
                        "message":"Login is Successful.Enjoy",
                        "admin_token":jwt_token,
                        "userName": result[0].admin_name
                    }
                    // res.send(express.response)
    
                    return res.status(200).json({message:"Login Successfull",userToken:jwt_token,userName:result[0].admin_name})
                }else{
                    return res.status(400).json({message:"Invalid Password"})
                }
            }
        }
    })
   
}

module.exports = login
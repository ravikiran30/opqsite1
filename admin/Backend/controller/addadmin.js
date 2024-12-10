const express = require("express")
const connection =require("../mysql/mysql.js")
const error_handler = require("./error_handler.js")
const bcrypt = require('bcrypt')


const addadmin= function(req,res){
        const email=req.body.admin_email
        const password=req.body.admin_password

        const admin_query="select * from opqadmin where admin_email=?"
        connection.query(admin_query,[email],async function(err,result){
            if(err){
                error_handler(err,req,res,400)
            }
            if(result.length>0){
                console.log("hii")
                return res.status(400).json({ message: 'admin already exist' });
            }else{
                
                const {admin_name,admin_email, admin_password} = req.body;
                
                // const hashedPassword = await bcrypt.hash(admin_password, 10);
                const hashedPassword= password
                const query = 'INSERT INTO opqadmin (admin_email,admin_name, admin_password) VALUES (?, ?, ?)';
                  connection.query(query, [admin_email,admin_name, hashedPassword], (err, results) => {
                      if (err) {
                          console.error('Database Error:', err);
                          return res.status(500).json({ message: 'Error adding Admin' });
                      }
                      console.log("Hi")
                      return res.status(200).json({ message: 'Admin added successfully', results});
                    })
               
            }
        })
}

module.exports=addadmin
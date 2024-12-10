const express = require("express");
const nodemailer = require('nodemailer');
const connection = require("../mysql/mysql.js");
const dotenv = require('dotenv').config()


my_email = process.env.Email
my_password  =process.env.Password

exports.addtosite = (req,res) => {
    const courseID = req.params.id;
    const { status } = req.body;
  
    const query = 'UPDATE courses SET status = ? WHERE courseID = ?'; 
  
    connection.query(query, [status, courseID], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json({ error: 'An error occurred while updating the status.' });
        }
  
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Course not found.' });
        }
  
        res.status(200).json({ message: 'Status updated successfully.' });
    });
}

exports.viewinsite = (req,res) => {
    const dataquery='select * from courses where status="done"'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}


exports.addworkshoptosite = (req,res) => {
    const workshopID = req.params.id;
    const { status } = req.body;
  
    const query = 'UPDATE workshop SET status = ? WHERE workshopID = ?'; 
  
    connection.query(query, [status, workshopID], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json({ error: 'An error occurred while updating the status.' });
        }
  
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Course not found.' });
        }
  
        res.status(200).json({ message: 'Status updated successfully.' });
    });
}

exports.viewworkshopinsite = (req,res) => {
    const dataquery='select * from workshop where status="done"'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}


exports.viewsiteparticularcourse = (req,res) => {
    const courseID = req.params.id;
  
    const query = 'select *  FROM courses WHERE courseID = ? ';
  
    connection.query(query, [courseID], (err, result) => {
        if (err) {
            console.error('Error in viewing', err);
            return res.status(500).json({ error: 'An error occurred in viewing the student.' });
        }
  
        return res.status(200).json(result[0])
      });
  }


  exports.enrollments = (req, res) => {
    
    const currentDate = new Date().toISOString().split('T')[0];
    const { fullname,email,contact,city,course_name } = req.body;
   
    
    const query = `INSERT INTO staticEnrollments ( fullname,email,contact,city,course_name,enrollment_date) VALUES (?, ?, ?, ?, ?,?)`;
    connection.query(query, [fullname,email,contact,city,course_name,currentDate], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Error in enrolling Course' });
        }
        console.log("Hi")
         // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any other email service or SMTP
        // secure:true,
        // port:8001,
        auth: {
            user: my_email, // Replace with your email
            pass: my_password   // Replace with your email  app-specific password
        }
    });

    // Email options
    const mailOptions = {
        from: my_email ,  // Replace with your email
        to: email,                       // The user's email from the form
        subject: `Enrollment Confirmation for ${course_name} Course`,
        html: `
        <p>Hello ${fullname},</p>
        <p>Thank you for your interest in OPQ Bootcamp! We have received your enrollment in the <b>${course_name}</b> course.</p>
        <p>We will contact you soon at <b>${contact}</b>.</p>
        <p>City: ${city}</p>
        <p>
        <p>Best regards,</p>
        <p>OPQ Team</p>
        </p>
        <a href="https://www.opqbootcamp.com/">https://www.opqbootcamp.com/</a>
        <br><br>
        <img src="cid:logo" alt="OPQ Bootcamp Logo" width="200">
    `,
    attachments: [
        {
            filename: 'opq-logo.png',
            path: './assests/opq-logo.png', // Replace with the path to your image
            cid: 'logo' // Same cid value as in the img src
        }
    ]
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Enrollment successful, email sent!' });
    });
        return res.status(200).json({ message: 'Enrollment submitted successfully', result });
        
    });
    
  };
  




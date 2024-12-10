const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");

exports.addInstructor = (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

   
    const hireDate = new Date();
    const { firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state } = req.body;
    const dateOfBirth11 = new Date(dateOfBirth).toISOString().split('T')[0];
    const photo = req.file.filename;

    

    const query = 'INSERT INTO instructors (firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, photo, hireDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, email, phoneNumber, dateOfBirth11, address, city, state, photo, hireDate], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Error adding Instructor' });
        }
        console.log("Hi")
        return res.status(200).json({ message: 'Instructor added successfully', results });
    });
};

exports.viewInstructor = (req,res) => {
    const dataquery='select * from instructors'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.deleteInstructor = (req,res) => {
  const instructorID = req.params.id;

  const query = 'DELETE FROM instructors WHERE instructorID = ?';

  connection.query(query, [instructorID], (err, result) => {
      if (err) {
          console.error('Error deleting instructor:', err);
          return res.status(500).json({ error: 'An error occurred while deleting the instructor.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'instructor not found.' });
      }

      res.status(200).json({ message: 'Instructor deleted successfully.' });
    });
}

exports.viewparticularinstructor = (req,res) => {
  const instructorID = req.params.id;

  const query = 'select *  FROM instructors WHERE instructorID = ?';

  connection.query(query, [instructorID], (err, result) => {
      if (err) {
          console.error('Error in viewing', err);
          return res.status(500).json({ error: 'An error occurred in viewing the Instructor.' });
      }

      return res.status(200).json(result[0])
    });
}

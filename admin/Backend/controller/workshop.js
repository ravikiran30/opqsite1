const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");


exports.addworkshop = (req, res) => {
    const { title, author, date, time, descr, cost, link } = req.body;
    const image = req.file.filename;
    const date11 = new Date(date).toISOString().split('T')[0];
  
    const sql = 'INSERT INTO workshop (title, author, date, time, descr, cost, link, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [title, author, date11 , time, descr, cost, link, image], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json({ message: 'Workshop added successfully!' });
      }
    });
}

exports.viewworkshop = (req,res) => {
    const dataquery='select * from workshop'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.deletestudent = (req,res) => {
  const studentID = req.params.id;

  const query = 'DELETE FROM students WHERE studentID = ?';

  connection.query(query, [studentID], (err, result) => {
      if (err) {
          console.error('Error deleting student:', err);
          return res.status(500).json({ error: 'An error occurred while deleting the student.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'Student not found.' });
      }

      res.status(200).json({ message: 'Student deleted successfully.' });
    });
}


exports.viewparticularstudent = (req,res) => {
  const studentID = req.params.id;

  const query = 'select *  FROM students WHERE studentID = ?';

  connection.query(query, [studentID], (err, result) => {
      if (err) {
          console.error('Error in viewing', err);
          return res.status(500).json({ error: 'An error occurred in viewing the student.' });
      }

      return res.status(200).json(result[0])
    });
}


exports.editparticularstudent = (req,res) => {
  const studentID = req.params.studentID;
  const { email, phoneNumber, dateOfBirth, address, city, state, enrollmentDate } = req.body;
  const query = `
      UPDATE students 
      SET email = ?, phoneNumber = ?, dateOfBirth = ?, address = ?, city = ?, state = ?, enrollmentDate = ?
      WHERE studentID = ?
  `;

  connection.query(
      query, 
      [email, phoneNumber, dateOfBirth, address, city, state, enrollmentDate, studentID], 
      (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Failed to update student data' });
          }

          res.json({ message: 'Student updated successfully' });
      }
  );
}




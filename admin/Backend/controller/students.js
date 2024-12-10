const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");


exports.addStudent = (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

   
    const enrollmentDate = new Date();
    const { firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state } = req.body;
    const dateOfBirth11 = new Date(dateOfBirth).toISOString().split('T')[0];
    const photo = req.file.filename;


    const query = 'INSERT INTO students (firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, photo, enrollmentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, email, phoneNumber, dateOfBirth11, address, city, state, photo, enrollmentDate], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Error adding student' });
        }
        console.log("Hi")
        return res.status(200).json({ message: 'Student added successfully', results });
    });
};

exports.viewStudent = (req,res) => {
    const dataquery='select * from students'
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


// exports.editparticularstudent = (req,res) => {
//   const studentID = req.params.studentID;
//   const { email, phoneNumber, dateOfBirth, address, city, state, enrollmentDate } = req.body;
//   const query = `
//       UPDATE students 
//       SET email = ?, phoneNumber = ?, dateOfBirth = ?, address = ?, city = ?, state = ?, enrollmentDate = ?
//       WHERE studentID = ?
//   `;

//   connection.query(
//       query, 
//       [email, phoneNumber, dateOfBirth, address, city, state, enrollmentDate, studentID], 
//       (err, result) => {
//           if (err) {
//               return res.status(500).json({ error: 'Failed to update student data' });
//           }

//           res.json({ message: 'Student updated successfully' });
//       }
//   );
// }

exports.editparticularstudent = (req,res) => {
    const studentID = req.params.studentID;
    const updatedData = req.body;

    // Assuming you're using MySQL, this would be an example query
    const query = `UPDATE students SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, address = ?, city = ?, state = ?, dateOfBirth = ?, enrollmentDate = ? WHERE studentID = ?`;

    connection.query(query, [
        updatedData.firstName,
        updatedData.lastName,
        updatedData.email,
        updatedData.phoneNumber,
        updatedData.address,
        updatedData.city,
        updatedData.state,
        updatedData.dateOfBirth,
        updatedData.enrollmentDate,
        studentID
    ], (error, results) => {
        if (error) {
            console.error('Error updating student:', error);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Student updated successfully');
    });
};




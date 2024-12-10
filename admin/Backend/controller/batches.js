const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");


exports.addbatches = (req, res) => {

    const { batchName, startDate, endDate, course_name, courseID } = req.body;

    const query = `INSERT INTO batches (batchName, startDate, endDate, course_name,courseID) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [batchName, startDate, endDate, course_name, courseID], (err, result) => {
        if (err) {
            console.error('Error creating batch:', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json({ message: 'Batch created successfully', result});
    });
};

exports.viewbatches = (req,res) => {
    const dataquery='select * from batches'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.deletebatches = (req,res) => {
  const batchID = req.params.id;

  const query = 'DELETE FROM students WHERE batchID = ?';

  connection.query(query, [batchID], (err, result) => {
      if (err) {
          console.error('Error deleting batch:', err);
          return res.status(500).json({ error: 'An error occurred while deleting the batch.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'batch not found.' });
      }

      res.status(200).json({ message: 'Batch deleted successfully.' });
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

      return res.status(200).json(result)
    });
}




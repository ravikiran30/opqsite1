const express = require("express")
const connection = require("../mysql/mysql.js")
const error_handler = require("./error_handler.js")


exports.viewEnrollment = (req,res) => {
  const dataquery='select * from staticEnrollments'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.updateEnrollStatus = (req,res) => {
  const staticEnroll_id = req.params.id;
  const { status } = req.body;

  const query = 'UPDATE staticEnrollments SET status = ? WHERE staticEnroll_id = ?';

  connection.query(query, [status, staticEnroll_id], (err, result) => {
      if (err) {
          console.error('Error updating status:', err);
          return res.status(500).json({ error: 'An error occurred while updating the status.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'Enquiry not found.' });
      }

      res.status(200).json({ message: 'Status updated successfully.' });
  });
}

exports.deleteEnrollrecord = (req,res) => {
  const staticEnroll_id = req.params.id;

  const query = 'DELETE FROM staticEnrollments WHERE staticEnroll_id = ?';

  connection.query(query, [staticEnroll_id], (err, result) => {
      if (err) {
          console.error('Error deleting record', err);
          return res.status(500).json({ error: 'An error occurred while deleting the record.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'Record not found.' });
      }

      res.status(200).json({ message: 'record deleted successfully.' });
    });
}

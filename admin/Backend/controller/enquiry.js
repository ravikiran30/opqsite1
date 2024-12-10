const express = require("express")
const connection = require("../mysql/mysql.js")
const error_handler = require("./error_handler.js")


exports.view = (req,res) => {
  const dataquery='select * from enquiry'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.addadmin = (req,res) => {
  const {admin_name,admin_email, admin_password} = req.body;
  
  const query = 'INSERT INTO opqadmin (admin_email,admin_name, admin_password) VALUES (?, ?, ?)';
    connection.query(query, [admin_email,admin_name, admin_password], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Error adding Admin' });
        }
        console.log("Hi")
        return res.status(200).json({ message: 'Admin added successfully', results});
})
}

exports.updateStatus = (req,res) => {
  const enquiryID = req.params.id;
  const { status } = req.body;

  const query = 'UPDATE enquiry SET status = ? WHERE enquiry_id = ?';

  connection.query(query, [status, enquiryID], (err, result) => {
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

exports.deleterecord = (req,res) => {
  const enquiry_id = req.params.id;

  const query = 'DELETE FROM enquiry WHERE enquiry_id = ?';

  connection.query(query, [enquiry_id], (err, result) => {
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




  




const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");

exports.countStudent = (req,res) => {
    const student_count=`SELECT 'students' AS students, COUNT(*) AS row_count FROM students
UNION ALL
SELECT 'instructors' AS instructors, COUNT(*) AS row_count FROM instructors
UNION ALL
SELECT 'courses' AS courses, COUNT(*) AS row_count FROM courses
UNION ALL
SELECT 'batch' AS batches, COUNT(*) AS row_count FROM batches
UNION ALL
SELECT 'enquiry' AS enquiry, COUNT(*) AS row_count FROM enquiry
UNION ALL
SELECT 'workshop' AS workshop, COUNT(*) AS row_count FROM workshop
UNION ALL
SELECT 'static' AS static, COUNT(*) AS row_count FROM staticEnrollments
;`
    connection.query(student_count,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }      
})
    
}
// exports.countCourse = (req,res) => {
//     const dataquery='select count(*) as count from courses'
//     connection.query(dataquery,[],function(err,result){
//       if(err){
//         return res.status(400).json({message:'No data found'})
//       }else{
//         return res.status(200).json(result)
//       }
// })
// }
// exports.countBatches = (req,res) => {
//     const dataquery='select count(*) as count from batches'
//     connection.query(dataquery,[],function(err,result){
//       if(err){
//         return res.status(400).json({message:'No data found'})
//       }else{
//         return res.status(200).json(result)
//       }
// })
// }
// exports.countEnquiry = (req,res) => {
//     const dataquery='select count(*) as count from enquiry'
//     connection.query(dataquery,[],function(err,result){
//       if(err){
//         return res.status(400).json({message:'No data found'})
//       }else{
//         return res.status(200).json(result)
//       }
// })
// }
// exports.countInstructor = (req,res) => {
//     const dataquery='select count(*) as count from instructors'
//     connection.query(dataquery,[],function(err,result){
//       if(err){
//         return res.status(400).json({message:'No data found'})
//       }else{
//         return res.status(200).json(result)
//       }
// })
// }


// exports.countWorkshop = (req,res) => {
//   const dataquery='select count(*) as count from workshop'
//   connection.query(dataquery,[],function(err,result){
//     if(err){
//       return res.status(400).json({message:'No data found'})
//     }else{
//       return res.status(200).json(result)
//     }
// })

// }



const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");

exports.addcourses = (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.files);
  
  const { category, courseName, courseUrl, courseFee, skills, shortDescription, fullDescription, overview, whatWillYouLearn,courseRequirements,whoIsThisCourseFor,course_image,banner_image,syllabus_pdf } = req.body;
  const photo =req.files['courseImage'][0].filename;
  const banner = req.files['bannerImage'][0].filename;
  const syllabus = req.files['syllabusPdf'][0].filename;
  
 

  const query = `INSERT INTO courses (category, course_name, course_url, course_fee, skills, short_description, full_description, overview, what_will_you_learn,course_requirements,who_is_this_course_for,course_image,banner_image,syllabus_pdf )
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [category, courseName, courseUrl, courseFee, skills, shortDescription, fullDescription, overview, whatWillYouLearn,courseRequirements,whoIsThisCourseFor,photo,banner,syllabus ], (err, result) => {
      if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error in adding Course' });
      }
      console.log("Hi")
      return res.status(200).json({ message: 'Course added successfully', result });
  });
};

exports.viewCourse = (req,res) => {
    const dataquery='select * from courses'
    connection.query(dataquery,[],function(err,result){
      if(err){
        return res.status(400).json({message:'No data found'})
      }else{
        return res.status(200).json(result)
      }
})
}

exports.deleteCourse = (req,res) => {
  const courseID = req.params.id;

  const query = 'DELETE FROM courses WHERE courseID = ?';

  connection.query(query, [courseID], (err, result) => {
      if (err) {
          console.error('Error deleting course:', err);
          return res.status(500).json({ error: 'An error occurred while deleting the course.' });
      }

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: 'Course not found.' });
      }

      res.status(200).json({ message: 'Course deleted successfully.' });
    });
}

exports.viewparticularcourse = (req,res) => {
  const courseID = req.params.id;

  const query = 'select *  FROM courses WHERE courseID = ?';

  connection.query(query, [courseID], (err, result) => {
      if (err) {
          console.error('Error in viewing', err);
          return res.status(500).json({ error: 'An error occurred in viewing the student.' });
      }

      return res.status(200).json(result[0])
    });
}


exports.viewparticularcourse = (req,res) => {
  const courseID = req.params.id;

  const query = 'select *  FROM courses WHERE courseID = ?';

  connection.query(query, [courseID], (err, result) => {
      if (err) {
          console.error('Error in viewing', err);
          return res.status(500).json({ error: 'An error occurred in viewing the student.' });
      }

      return res.status(200).json(result[0])
    });
}





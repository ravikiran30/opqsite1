const express = require("express")
const router = express.Router()
const addadmin = require('../controller/addadmin.js')
const login = require("../controller/login.js")
const contact = require("../controller/contact.js")
const enquiry = require("../controller/enquiry.js")
const students = require('../controller/students.js')
const courses = require('../controller/courses.js')
const batches=require("../controller/batches.js")
const enrollments=require('../controller/enrollments.js')
const dashboard=require('../controller/dashboard.js')
const staticsite=require('../controller/staticsite.js')
const Workshop = require('../controller/workshop.js')
const courseFromStatic = require('../controller/courseFrom_static.js')
const verifyToken = require('../controller/jwt_verify.js')
const multer  =require("multer")
const path = require('path');

const instructor = require("../controller/instructor.js")

//this for post(addstudent)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save the files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  }
})

const upload = multer({ dest:'uploads/' });
// const upload = multer({
//   storage: storage,
//   limits: {fileSize: 1000000}, // Limit file size to 1MB
// }).single('photo');



  


router.post ("/addadmin",addadmin)
router.post("/login",login)
router.get('/enquiry',verifyToken,enquiry.view)
router.put('/updatestatus/:id',enquiry.updateStatus)
router.delete('/deleterecord/:id', enquiry.deleterecord)
router.post('/contact',contact)

router.post('/addstudent',upload.single('photo'),students.addStudent)
router.get('/viewstudent',verifyToken,students.viewStudent)
router.delete('/deletestudent/:id', students.deletestudent)
router.get('/students/:id',verifyToken, students.viewparticularstudent)
router.put('/studentedit/:id', students.editparticularstudent)




router.post('/addcourse', upload.fields([
  { name: 'courseImage', maxCount: 1 },  
  { name: 'bannerImage', maxCount: 1 },  
  { name: 'syllabusPdf', maxCount: 1 }  
]), courses.addcourses);
router.get('/viewcourse',verifyToken,courses.viewCourse)
router.get('/course/:id', verifyToken,courses.viewparticularcourse)
router.delete('/deletecourse/:id',courses.deleteCourse)


router.post('/addinstructor',upload.single('photo'),instructor.addInstructor)
router.get('/viewinstructor',verifyToken,instructor.viewInstructor)
router.delete('/deleteinstructor/:id', instructor.deleteInstructor)
router.get('/instructors/:id',verifyToken, instructor.viewparticularinstructor)
router.put('/instructoredit/:id', students.editparticularstudent)

 

router.post('/addbatches',batches.addbatches)
router.get('/viewbatches',batches.viewbatches)
router.delete('/deletebatch/:id', batches.deletebatches)

router.post('/addworkshop',upload.single('image'),Workshop.addworkshop)
router.get('/viewworkshop',verifyToken,Workshop.viewworkshop)



router.post('/addstudenttobatch',enrollments.addenrollment)
router.post('/addinstructortobatch',enrollments.addinstructorenrollment)
router.get('/viewbatchdetails/:id',enrollments.viewbatchdeatils)
router.get('/viewinstructorbatchdetails/:id',enrollments.viewinstructorbatchdeatils)
router.get('/viewstudentdetails/:id',enrollments.viewstudentdeatils)
router.delete('/deletestudent/:id',enrollments.deletestudentenroll)
router.get('/viewinstructordetails/:id',enrollments.viewinstructordeatils)

router.get('/viewEnrollments',courseFromStatic.viewEnrollment)
router.put('/updateenrollstatus/:id',courseFromStatic.updateEnrollStatus)
router.delete('/deleteenroll/:id',courseFromStatic.deleteEnrollrecord)


router.get('/countDashboard',verifyToken,dashboard.countStudent)
 
router.put('/coursetosite/:id',staticsite.addtosite)
router.get('/courses',staticsite.viewinsite)
router.put('/workshoptosite/:id',staticsite.addworkshoptosite)
router.get('/workshop',staticsite.viewworkshopinsite)
router.get('/courses/:id', staticsite.viewsiteparticularcourse)
router.post('/courses/enroll',staticsite.enrollments)





module.exports = router;

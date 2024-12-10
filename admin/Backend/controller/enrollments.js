const express = require("express");
const connection = require("../mysql/mysql.js");
const error_handler = require("./error_handler.js");


exports.addenrollment = (req, res) => {

    const { batchID,studentID } = req.body;

    const query = `INSERT INTO enrollments (batchID,studentID) VALUES (?, ?)`;
    connection.query(query, [batchID,studentID], (err, result) => {
        if (err) {
            console.error('Error in adding student to batch:', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json({ message: 'adding student to batch is successful', result});
    });
};

exports.viewbatchdeatils = (req, res) => {

    const batchID = req.params.id;

    const query = ` SELECT * 
        FROM students AS s
        JOIN enrollments AS e ON s.studentID = e.studentID
        JOIN batches AS b ON b.batchID = e.batchID
        WHERE b.batchID = ?;`;
    connection.query(query, [batchID], (err, result) => {
        if (err) {
            console.error('Error in viewing student :', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json(result)
    });
};


exports.viewstudentdeatils = (req, res) => {

    const studentID = req.params.id;

    const query = ` SELECT * 
        FROM students AS s
        JOIN enrollments AS e ON s.studentID = e.studentID
        JOIN batches AS b ON b.batchID = e.batchID
        WHERE s.studentID = ?;`;
    connection.query(query, [studentID], (err, result) => {
        if (err) {
            console.error('Error in viewing student :', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json(result)
    });
};


exports.addinstructorenrollment = (req, res) => {

    const { batchID,instructorID } = req.body;

    const query = `INSERT INTO instructorenrollments (batchID,instructorID) VALUES (?, ?)`;
    connection.query(query, [batchID,instructorID], (err, result) => {
        if (err) {
            console.error('Error in adding student to batch:', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json({ message: 'adding student to batch is successful', result});
    });
};



exports.viewinstructorbatchdeatils = (req, res) => {

    const batchID = req.params.id;

    const query = ` SELECT * 
        FROM instructors AS s
        JOIN instructorenrollments AS e ON s.instructorID = e.instructorID
        JOIN batches AS b ON b.batchID = e.batchID
        WHERE b.batchID = ?;`;
    connection.query(query, [batchID], (err, result) => {
        if (err) {
            console.error('Error in viewing student :', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json(result)
    });
};

exports.deletestudentenroll = (req, res) => {

    const studentID = req.params.id;

    const query = ` delete from enrollments where studentID = ?;`;
    connection.query(query, [studentID], (err, result) => {
        if (err) {
            console.error('Error in viewing student :', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json(result)
    });
};



exports.viewinstructordeatils = (req, res) => {

    const instructorID = req.params.id;

    const query = ` SELECT * 
        FROM instructors AS s
        JOIN instructorenrollments AS e ON s.instructorID = e.instructorID
        JOIN batches AS b ON b.batchID = e.batchID
        WHERE s.instructorID = ?;`;
    connection.query(query, [instructorID], (err, result) => {
        if (err) {
            console.error('Error in viewing instructor :', err);
            return res.status(500).send('Server error');
        }
        return res.status(200).json(result)
    });
};




const express = require("express")
const connection = require("../mysql/mysql.js")
const error_handler = require("./error_handler.js")
const axios = require('axios');


const contact = function (req, res) {

  
  const currentDate = new Date().toISOString().split('T')[0];

  const { name, phone_number, email, message, contactMethod, captchaToken } = req.body;
  axios
  .post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: "6LfinCMqAAAAANfV0yOBQZHdVJwwO529juUkpHnR",
      response: captchaToken,
    },
  })
  .then((captchaResponse) => {
    if (!captchaResponse.data.success) {
      return res.status(400).json({ error: 'Failed CAPTCHA verification' });
    }

      
      const query = "insert into enquiry set name=? ,email=?,phone_number=?,message=?,enquiry_date=? ,contact_method=?"
      connection.query(query, [name, email, phone_number, message,currentDate,contactMethod], function (err, result) {
          if (err) {
              error_handler(err, req, res, 400)
          }
          else {
              return res.status(200).json({ message: 'Message is submitted' });
          }
      })
  })

}



module.exports = contact
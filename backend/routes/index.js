var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer')

router.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', (req, res)=>{
  console.log(req.body)
  res.redirect('/')
  const output = `
  <p>You have a new email</p>
  <h3>Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'alexandercleoni@gmail.com',
      pass: 'Desiree93!'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`, // sender address
    to: 'alexander.cleoni@gmail.com', // receivers,
    subject: 'Hello!!!', // subject line
    text: 'Hello World', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info)=>{
    if (err) {
      return console.log(err)
    } else 
    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageURL(info));
  });
});

module.exports = router;

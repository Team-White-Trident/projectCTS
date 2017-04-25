
var router = require('express').Router();
var nodemailer = require('nodemailer');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('main/home');
});

router.get('/about', function(req, res) {
  res.render('main/about');
});

router.route('/contactus')
          .get(function(req, res) {
            res.render('main/contactus');
          })
          .post(function(req, res) {
          if(!req.user) return res.redirect('/getin');
          else {
          var mailOpts, smtpTrans;
           //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
           smtpTrans = nodemailer.createTransport({
               service: 'Gmail',
               auth: {
                  user: "teamwhitetrident@gmail.com",
                  pass: "team@123"
               }
           });
           //Mail options
           mailOpts = {
               from: req.body.name + ' &lt;' + user.email + '&gt;', //grab form data from the request body object
               to: 'teamwhitetrident@gmail.com',
               subject: 'Website contact form',

               text: req.body.feedback + '\n'+'sender : ' + user.email +' ' +'<'+ req.body.name + ' '+req.body.lastname +'>'

           };

          smtpTrans.sendMail(mailOpts, function(error, info){
             if(error){
                 console.log(error);
                 res.json({yo: 'error'});
             }else{
               //req.flash("your response has been submitted");
              // res.redirect('/');
                 console.log('Message sent: ' + info.response);
                // res.json({yo: info.response});
              //  res.json("your response has been submitted");
                res.redirect('/thanks');

             };

          });
          };
          });

router.get('/thanks', function(req, res) {
  res.render('main/thanks');
});

router.get('/template',function(req,res,next){

    res.render('main/category',{

    });
  });

module.exports = router;

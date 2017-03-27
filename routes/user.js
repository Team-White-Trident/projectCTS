var router = require('express').Router();
var User = require('../models/user');

var passport = require('passport');
var passportConf = require('../config/passport');

var hackerEarth = require("hackerearth-node");
var hackerEarth = new hackerEarth("4c75190518a990bc876ce8c4403ce171dd7e549d",'');

var config={};
config.time_limit=5;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to hackerEarth api
config.input="1";  //input against which you have to test your source code
config.language="C"; //optional choose any one of them or none

router.post("/compile",function(req,res){

  config.source=req.body.code;
  config.language=req.body.language;
      console.log("Code is : "+ config.source);
   hackerEarth.compile(config,function(err,response){

       if(err) {
           console.log("There is error");
   console.log(err);
       } else {
           res.send(response);
       }
 });
});
router.post("/run",function(req,res){
  config.source=req.body.code;
  config.language=req.body.language;
  hackerEarth.run(config,function(err,response){
         if(err) {
          console.log("This is error"+ err);
         } else {
           //deal with response
           res.send(response);
         }
   });

});
/********************************************/

router.post('/savehistory',function(req,res,next)
{
//var user = new User();
  // user.history.templateName = req.body.codename;
  // user.history.templateLanguage = req.body.language;
  console.log(req.body.codename);
  console.log(req.body.language);
   User.findOne({_id: req.user._id}, function(err,user)
   {
     if(err) return next(err);
  var idd = req.user._id;
  console.log(idd);
  user.history.push({
    templateName:req.body.codename,
    templateLanguage:req.body.language
  });
  user.save(function(err, user){
    if(err) next(err);
  });
//user.update( { "_id" : idd},{ $push: { "history.templateName":req.body.codename,"history.templateLanguage":req.body.language  } });
});

});


/******************************************/


router.get('/login',function(req,res)
{
//  if(req.user) return res.redirect('/');
  res.render('accounts/login', {message:req.flash('loginMessage')});
});



router.post('/login', passport.authenticate('local-login',{
  successRedirect: '/aceEditor',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/profile',passportConf.isAuthenticated,function(req,res,next)
{

User
.findOne({_id: req.user._id})
//.populate('history.item')
.exec(function(err,user)
{
  if(err) return next(err);

  res.render('accounts/profile', {user: user});
 });

});

router.get('/aceEditor',function(req,res)
{
 if(!req.user) return res.redirect('/');
else  res.render('main/aceEditor');
});

router.get('/signup',function(req,res,next)
{
  res.render('accounts/signup', {
  errors: req.flash('errors')
 });
});

router.post('/signup',function(req,res,next)
{
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

User.findOne({email : req.body.email}, function(err, existingUser)
{
  if(existingUser)
  {
      req.flash('errors','Account with that email already exists');
    return res.redirect('/signup');
  }
  else {

      user.save(function(err, user){
        if(err) next(err);

          req.logIn(user,function(err){
            if(err) next(err);
            res.redirect('/aceEditor');
          });
       });
     }
  });
});
router.get('/logout',function(req,res,next)
{
req.logout();
res.redirect('/');
});
router.get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'}));
router.get('/auth/facebook/callback',passport.authenticate('facebook', {
  successRedirect:'/aceEditor',
  failureRedirect:'/login'
}));
module.exports = router;

var router = require('express').Router();
var User = require('../models/user');
var Template = require('../models/template');

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
   User.findOne({_id: req.user._id}, function(err,user)
   {
     if(err) return next(err);
  user.history.push({
    templateName:req.body.codename,
    templateLanguage:req.body.language
  });
  user.save(function(err, user){
    if(err) next(err);
  });
});
  Template.findOne({name: req.body.codename,language:req.body.language}, function(err,x)
  {
    if(err) return next(err);
  /*  x.update({
      $inc: { count: 1}
    });
    */
    x.count=x.count+1;
  x.save(function(err,x){
   if(err) next(err);
  });
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
  user.profile.picture = user.gravatar();

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
router.get('/auth/github',passport.authenticate('github',{scope: 'email'}));
router.get('/auth/github/callback',passport.authenticate('github', {
  successRedirect:'/aceEditor',
  failureRedirect:'/login'
}));
module.exports = router;

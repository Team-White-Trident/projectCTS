var router = require('express').Router();
var User = require('../models/user');
var Template = require('../models/template');
var passport = require('passport');
var passportConf = require('../config/passport');



router.route('/login')
    .get(function(req,res)
    {
    //  if(req.user) return res.redirect('/');
      res.render('accounts/login', {message:req.flash('loginMessage')});
    })
    .post(passport.authenticate('local-login',{
      successRedirect: '/aceEditor',
      failureRedirect: '/login',
      failureFlash: true
    }));



router.route('/signup')
    .get(function(req,res,next)
    {
      res.render('accounts/signup', {
      errors: req.flash('errors')
     });
    })
    .post(function(req,res,next)
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

router.get('/logout',function(req,res,next)
{
req.logout();
res.redirect('/');
});


router.post('/savehistory',function(req,res,next)
{
   User.findOne({_id: req.user._id}, function(err,user)
   {
     if(err) return next(err);
  user.history.push({
    _id:req.body.code
  // templateName:req.body.codename,
  //  templateLanguage:req.body.language
  });
  user.save(function(err, user){
    if(err) next(err);
  });
});
  Template.findOne({_id: req.body.code}, function(err,x)
  {
    if(err) return next(err);
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


router.route('/addNotification')
  .get(function(req,res){
    res.render('main/addNotification');
  })
   .post(function(req,res,next){
        var i=0;
       User.find({}, function(err,user)
       {
          if(err) return next(err);
          for(i=0;i<user.length;i++){
            if(user[i]._id!=req.user._id){
              user[i].notifications.push({
                notificationName: req.body.topic,
                description:req.body.description
              });
              user[i].save(function(err, user){
                if(err) next(err);

              });


            }
          }
          if(i==user.length){
            req.flash('success','Broadcasted!');
            return res.redirect('/addNotification');
          }
       });
     });




/********************************************/

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
/******************************************/
module.exports = router;

var router = require('express').Router();
var User = require('../models/user');
var Template = require('../models/template');
var passport = require('passport');
var passportConf = require('../config/passport');


router.route('/getin')
    .get(function(req,res)
    {
     if(!req.user){
      res.render('accounts/getin', {message:req.flash('loginMessage'),errors: req.flash('errors')});
    }else{
      res.redirect('/aceEditor');
    }
    });


router.route('/login')
    .post(passport.authenticate('local-login',{
      failureRedirect: '/getin',
      failureFlash: true

  }), (req, res) => {
  if (req.user.email == "teamwhitetrident@gmail.com") {
    res.redirect('/adminHome');
  }
  else {
    res.redirect('/aceEditor');
  }
});




router.route('/signup')
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
          return res.redirect('/getin');
        }
        else {

            user.save(function(err, user){
              if(err) next(err);

                req.logIn(user,function(err){
                  if(err) next(err);
                  if(req.body.role=='others'){
                    res.redirect('/aceEditor');
                  }else{
                    res.redirect('/question')
                  }
                });
             });
           }
        });
      });


router.get('/profile',passportConf.isAuthenticated,function(req,res,next)
{

User
.findOne({_id: req.user._id})

.exec(function(err,user)
{
  if(err) return next(err);

  res.render('accounts/profile', {user: user,message:req.flash('success'),errors: req.flash('errors')});
 });

});

router.get('/logout',function(req,res,next)
{
req.logout();
res.redirect('/');
});
router.get('/question',function(req,res)
{
  res.render('accounts/question');
});

router.post('/savehistory',function(req,res,next)
{
   User.findOne({_id: req.user._id}, function(err,user)
   {
     if(err) return next(err);
  user.history.push({
    _id:req.body.code
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


router.route('/addNotification')
  .get(function(req,res){
    res.render('main/addNotification');
  })
   .post(function(req,res,next){
        var i=0;
        console.log("woring on server");
       User.find({}, function(err,user)
       {
          if(err) return next(err);
          for(i=0;i<user.length;i++){
            if(!(user[i]._id.equals(req.user._id))){
              user[i].notifications.push({
                creator:req.user.profile.name,
                creatorEmail:req.user.email,
                notificationName: req.body.topic,
                description:req.body.description
              });
              user[i].save(function(err, user){
                if(err) next(err);

              });


            }
          }
          if(i==user.length){
            res.send({status:"Successfully Notified."});
          }
       });
     });

router.route('/notifications')
  .get(function(req,res){
      res.render('accounts/notifications');
  })
  .post(function(req,res,next){


    User.findOne({_id:req.user.id},function(err,user){

      for(i=0;i<user.notifications.length;i++){
          if(user.notifications[i].read===false){
            user.notifications[i].read=true;
          }
      }
      user.save(function(err, user){
        if(err) next(err);
      });
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

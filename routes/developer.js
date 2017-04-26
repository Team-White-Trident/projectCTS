var router = require('express').Router();
var CodeVerify = require('../models/codestoverify');
var Userstochange = require('../models/userstochange');


router.get('/add-code',function(req,res,next)
{
            res.render('admin/add-template',{message:req.flash('success')});
});

router.post('/add-code',function(req,res,next){
  var codeVerify  = new CodeVerify();
  codeVerify.language = req.body.type;
  codeVerify.name = req.body.name;
  codeVerify.code = req.body.code;
  codeVerify.creator = req.user.profile.name;
  codeVerify.creatoremail = req.user.email;

  codeVerify.save(function(err){
    if(err) return next(err);
    req.flash('success','Successfully requested to admin to add code');
    return res.redirect('/add-code');
  });
});
router.post('/changeprofile',function(req,res,next){
    var userstochange = new Userstochange();
    userstochange.name = req.user.profile.name;
    userstochange.email = req.user.email;

    Userstochange.findOne({email:req.user.email},function(err,existinguser){
      if(existinguser){
        req.flash('errors','You have already applied!');
      return res.redirect('/profile');
      }
      else{
        userstochange.save(function(err){
          if(err) return err;
          req.flash('Success','Successfully requested to addmin! Please wait till Reviewed');
          return res.redirect('/profile');

      });
    }
    });

    });
module.exports = router;

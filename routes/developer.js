var router = require('express').Router();
var CodeVerify = require('../models/codestoverify');


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
module.exports = router;

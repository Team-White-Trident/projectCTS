var router = require('express').Router();
var CodeVerify = require('../models/codestoverify');
var Userstochange = require('../models/userstochange');
var Question = require('../models/questionnaire')


router.post('/matchanswer',function(req,res,next){
var ab,ib, correct=0;
function asyncLoop(i,callback){
    if(i<req.body.numberofquestions){
        ab=req.body.answers[i];
        ib=req.body.ids[i];
        Question.findOne({_id:ib},function(err,question)
         {
           if(ab===question.answer)
           {
             correct++;
         }
          asyncLoop( i+1, callback );
           });
  }
    else{
      callback();
    }
}
asyncLoop(0,function(){
  if(correct==req.body.numberofquestions){
    next();
  }
  else{
    res.send({status:"Please retry!! You are not upto the mark."});
  }
});

},function(req,res){
  var userstochange = new Userstochange();
  userstochange.name = req.user.profile.name;
  userstochange.email = req.user.email;

  Userstochange.findOne({email:req.user.email},function(err,existinguser){
    if(existinguser){
      res.send({status:"You have already applied."})

    }
    else{
      userstochange.save(function(err){
        if(err) return err;
        res.send({status:'Successfully requested to admin! Please wait till Reviewed'});

    });
  }
  });

});





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
        res.send({status:"You have already applied."})

      }
      else{
        userstochange.save(function(err){
          if(err) return err;
          res.send({status:'Successfully requested to addmin! Please wait till Reviewed'});

      });
    }
    });
    });
module.exports = router;

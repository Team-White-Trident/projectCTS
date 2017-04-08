var router = require('express').Router();
//var Category = require('../models/category');
var Template = require('../models/template');
var Language = require('../models/language');




router.get('/add-language',function(req,res,next)
{
  res.render('admin/add-language',{message:req.flash('success')});
});

router.post('/add-language',function(req,res,next){
  var language = new Language();
  language.name = req.body.name;

  language.save(function(err){
    if(err) return next(err);
    req.flash('success','Successfully added a language');
    return res.redirect('/add-language');
  });
});
router.get('/add-template',function(req,res,next)
{
            res.render('admin/add-template',{message:req.flash('success')});
});

router.post('/add-template',function(req,res,next){
  var template = new Template();
  template.language = req.body.type;
  template.name = req.body.name;
  template.code = req.body.code;

  template.save(function(err){
    if(err) return next(err);
    req.flash('success','Successfully added a template');
    return res.redirect('/add-template');
  });
});
module.exports = router;

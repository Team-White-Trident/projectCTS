var router = require('express').Router();
var Template = require('../models/template');
var Language = require('../models/language');
var CodeVerify = require('../models/codestoverify');

router.get('/adminHome',function(req,res)
{
  res.render('admin/adminHome');
});
router.get('/allusers',function(req,res)
{
  res.render('admin/allusers');
});
router.get('/templates',function(req,res)
{
  res.render('admin/templates');
});


router.get('/review',function(req,res)
{
  res.render('admin/review');
});

router.post('/review',function(req,res,next)
{

var template = new Template();

    template.name=req.body.name;
    template.language=req.body.language;
    template.code=req.body.code;
    template.count=0;

CodeVerify.remove({name:req.body.name,language:req.body.language},function(err)
{
  if(err) next (err);
});


  template.save(function(err,template){
    if(err) next(err);
  });
 res.redirect('/review');
});


router.post('/reject',function(req,res,next)
{
  CodeVerify.remove({name:req.body.name,language:req.body.language},function(err)
  {
    if(err) next (err);
  });
  res.redirect('/review');
 });

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

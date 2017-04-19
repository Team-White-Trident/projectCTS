var router = require('express').Router();

var hackerEarth = require("hackerearth-node");
var hackerEarth = new hackerEarth("4c75190518a990bc876ce8c4403ce171dd7e549d",'');

var config={};
config.time_limit=5;
config.memory_limit=323244;
config.source='';
config.input="1";
config.language="C";

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
           res.send(response);
         }
   });

});
router.get('/aceEditor',function(req,res)
{
 if(!req.user) return res.redirect('/');
else  res.render('main/aceEditor');
});
module.exports = router;

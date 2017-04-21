
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GithubStrategy = require('passport-github').Strategy;

var secret = require('../config/secret');
var User = require('../models/user');


passport.serializeUser(function(user,done)
{
  done(null, user._id);
});

passport.deserializeUser(function(id,done)
{
  User.findById(id, function(err,user)
{
  done(err,user);
});
});



passport.use('local-login', new LocalStrategy({

usernameField:'email',
passwordField: 'password',
passReqToCallback: true
}, function(req,email,password,done){

User.findOne({email: email}, function(err,user)
{
  if(err) return done(err);
  if(!user)
  {
    return done(null,false,req.flash('loginMessage','no user has been found'));
  }

  if(!user.comparePassword(password))
  {
    return done(null,false,req.flash('loginMessage','Oops! Wrong Password'));

  }
  return done(null,user);
});
}));

passport.use(new FacebookStrategy(secret.facebook,function(token, refreshToken,profile,done){
  User.findOne({ email: profile._json.email},function(err,user){
    if(err) return done(err);
    if(user)
    {
      return done(null,user);
    } else{
      var newUser = new User();
      newUser.email = profile._json.email;
      newUser.facebook = profile.id;
      newUser.tokens.push({kind: 'facebook',token: token});
      newUser.profile.name = profile.displayName;
      newUser.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      newUser.role="others";
      newUser.save(function(err)
    {
      if(err) throw err;

      return done(null,newUser);
     });
   }
  });
}));

passport.use(new GithubStrategy(secret.github,function(token, refreshToken,profile,done){
  User.findOne({ email: profile._json.email },function(err,user){
    if(err) return done(err);
    if(user)
    {
      return done(null,user);
    } else{
      var newUser1 = new User();
      newUser1.email = profile._json.email;
      newUser1.github = profile.id;
      newUser1.tokens.push({kind: 'github',token: token});
      newUser1.profile.name = profile.displayName;
    //  newUser1.profile.picture = 'https://graph.github.com/' + profile.id + '/picture?type=large';
      newUser1.profile.picture = 'https://avatars1.githubusercontent.com/u/'+  profile.id +'?v=3&s=400';
      newUser1.role="others";
      newUser1.save(function(err)
    {
      if(err) throw err;

      return done(null,newUser1);
     });
   }
  });
}));


exports.isAuthenticated = function(req, res, next) {

  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/login');
}

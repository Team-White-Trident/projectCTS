var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  role : String,
  email : { type:String, unique:true, lowercase:true},
  password : String,
  facebook : String,
  github : String,
  tokens : Array,
  profile : {
    name : { type:String, default : ''},
    picture : { type:String, default : ''}
  },

  history :[{

   _id: {type: Schema.Types.ObjectId, ref:'Template'}

}],
 notifications :[{
   creator:String,
   creatorEmail: String,
   notificationName: String,
  description: String,
  read: { type:Boolean, default : false}
}],
projects:[{
  projectname:String,
  projectLanguage:String,
  project:String,
}]
});

UserSchema.pre('save',function(next)
{
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10,function(err,salt)
{
  if(err) return next(err);

  bcrypt.hash(user.password,salt,null,function(err,hash)
{
  if(err) return next(err);
  user.password=hash;
  next();
   });
  });
});

UserSchema.methods.comparePassword = function(password)
{
  return bcrypt.compareSync(password ,this.password);
}

UserSchema.methods.gravatar = function(size){
  if(!this.size) size = 200;
  if(!this.email) return 'https://gravatar.com/avatar/?s' + size +'&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

module.exports = mongoose.model('User', UserSchema);

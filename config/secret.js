
module.exports = {

  database:'mongodb://root:abc123@ds161069.mlab.com:61069/manisha',
  port: 3000,
  secretKey:"Mani@#4",

  facebook: {
    clientID: process.env.FACEBOOK_ID || '176956569486382',
    clientSecret: process.env.FACEBOOK_SECRET || '256711db11c482c0c3fc3b5688b8d02d',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://coditec.herokuapp.com/auth/facebook/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || '53b27f72da813e820977',
    clientSecret: process.env.GITHUB_SECRET || '668cc01953ceb66f8819cc6a2d3158aa3d0cf2e4',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://coditec.herokuapp.com/auth/github/callback'
  }

}

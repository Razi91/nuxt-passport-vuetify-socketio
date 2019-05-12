module.exports = {
  db: 'mongodb://localhost/authexample',
  google: {
    clientID: 'Google client id',
    clientSecret: 'client secret',
    callbackURL: 'http://local.com:3000/api/auth/google-callback',
    passReqToCallback: true
  }
}

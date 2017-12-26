var social = require('./social.json');

module.exports = (Users) =>{
  var passport = require('passport');
   var  LocalStrategy = require('passport-local').Strategy;
  var GitHubTokenStrategy = require('passport-github-token');
  var FacebookTokenStrategy = require('passport-facebook-token');
  var TwitterTokenStrategy = require('passport-twitter-token');
  
  //passport serialize
  passport.serializeUser(function(user, done){done(null, user);});
  passport.deserializeUser(function(obj, done){done(null, obj);});

  passport.use(new LocalStrategy({ // local 전략을 세움
      usernameField: 'id',
      passwordField: 'passwd',
      session: true,       
      passReqToCallback: false,
    }, async function(id, passwd, done){
      const user = await Users.findOne({id: id, passwd: passwd}, {__v: 0, _id:0});
      if(user) return done(null, user);
      else return done(null, false, {message: "아이디나 비밀번호가 틀렸습니다"})
    }));


  //passport setting
  if(social.facebook.use){
    passport.use(new FacebookTokenStrategy({
      clientID: social.facebook.clientID,
      clientSecret: social.facebook.clientSecret,
      profileFields: ['id', 'displayName', 'photos'],
    }, (accessToken, refreshToken, profile, done)=>{
      done(null, profile);
    }));
  }

  if(social.twitter.use){ 
    passport.use(new TwitterTokenStrategy({
      consumerKey: social.twitter.consumerKey,
      consumerSecret: social.twitter.consumerSecret,
    },(accessToken, refreshToken, profile, done)=>{
      console.log(accessToken);
      done(null, profile);
    }));
  }


  if(social.github.use){
    passport.use(new GitHubTokenStrategy({
      clientID: social.github.clientID,
      clientSecret: social.github.clientSecret,
      passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, next) =>{
      return next(null, profile);
    }));
  }


  return passport;
}

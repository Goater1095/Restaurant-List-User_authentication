const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  //初始化模組
  app.use(passport.initialize());
  app.use(passport.session());
  //使用策略
  passport.use(
    //usernameField 將預設的 username 改成email
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'This email is not registered!',
            });
          }
          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, {
                message: 'Email or Password incorrect.',
              });
            }
            return done(null, user);
          });
        })
        .catch((err) => done(err, false));
    })
  );
  //序列反序列化 session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean() //有可能傳進前端樣板所以轉成JS物件
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};

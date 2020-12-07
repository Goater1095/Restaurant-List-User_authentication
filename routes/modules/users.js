const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');
router.get('/login', (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
);

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('User already exist!');
      return res.render('register', { name, email, password, confirmPassword });
    }
    return User.create({ name, email, password })
      .then(() => res.redirect('/login')) //註冊完回去登入頁
      .catch((err) => console.log(err));
  });
});
//User.find() 是否catch 錯誤??

module.exports = router;

const express = require('express');
const exhbs = require('express-handlebars');
const session = require('express-session');
const usePassport = require('./config/passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const Rest = require('./models/restaurant');
const routes = require('./routes');
const port = process.env.PORT;
require('./config/mongoose');

const app = express();

//set static folder
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//set method-override
app.use(methodOverride('_method'));

usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg
  res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg
  res.locals.error_msg = req.flash('error'); // 設定 success_msg
  next();
});
//將request 導入router
app.use(routes);

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//啟動server
app.listen(port, () => {
  console.log(`This Server is start on http://localhost:${port}`);
});

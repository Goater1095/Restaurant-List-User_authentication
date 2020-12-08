const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const db = require('../../config/mongoose');
const restList = require('../../restaurant.json');

// 載入model
const Rest = require('../restaurant');
const User = require('../user');
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
  },
  { email: 'user2@example.com', password: '12345678' },
];

db.once('open', () => {
  for (let number in SEED_USER) {
  }
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER[0].password, salt))
    .then((hash) => {
      return User.create({
        email: SEED_USER[0].email,
        password: hash,
      });
    })
    .then((user) => {
      Promise.all(
        Array.from({ length: 3 }, (_, i) => {
          let tempRest = restList.results[i];
          tempRest.userId = user._id;
          console.log(tempRest.name, 'start');
          Rest.create(tempRest);
        })
      ).then(() => process.exit());
      console.log('done.');
    })
    .catch((err) => console.log('create User 1 error', err));
});

// 第一位使用者：
// email: user1@example.com
// password: 12345678
// 擁有 #1, #2, #3 號餐廳
// 第二位使用者：
// email: user2@example.com
// password: 12345678
// 擁有 #4, #5, #6 號餐廳

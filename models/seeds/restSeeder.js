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
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(SEED_USER[number].password, salt))
      .then((hash) => {
        return User.create({
          email: SEED_USER[number].email,
          password: hash,
        });
      })
      .then((user) => {
        Promise.all(
          Array.from({ length: 3 }, (_, i) =>
            Rest.create(
              Object.assign(restList.results[i + number * 3], {
                userId: user._id,
              })
            )
          )
        );
      })
      .then(() => {
        console.log(`User number_${number} done!`);
        // process.exit(); //這個不知道為何增加就會提前結束 (不是要等Promise.all 都執行完嗎??)
      })
      .catch((err) => console.log('create User 1 error', err));
  }
});

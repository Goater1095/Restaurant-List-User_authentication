const express = require('express');
const router = express.Router();
const Rest = require('../../models/restaurant');

router.get('/', (req, res) => {
  const userId = req.user._id;
  Rest.find({ userId })
    .lean()
    .then((rests) => res.render('index', { resList: rests }))
    .catch((error) => console.error(error));
});

module.exports = router;

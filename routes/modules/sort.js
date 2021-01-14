const express = require('express');
const router = express.Router();
const Rest = require('../../models/restaurant');

router.get('/:keyword', (req, res) => {
  //為什麼 window 未定義???? (這是因為nodejs是後端的程式語言，無法拿到前端window的object。只有在寫真正前端的javascript才有window.)
  // console.log(window.location);
  const keyword = req.params.keyword;
  let [method, select] = keyword.split('-');
  Rest.find()
    .lean()
    .sort({ [select]: [method] })
    .then((rests) => res.render('index', { resList: rests }))
    .catch((error) => console.error(error));
});

module.exports = router;

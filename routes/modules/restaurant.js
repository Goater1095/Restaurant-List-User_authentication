const express = require('express');
const router = express.Router();
const Rest = require('../../models/restaurant');

// 新增餐廳清單
router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', (req, res) => {
  const body = req.body;
  body.userId = req.user._id;
  return Rest.create(body)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});

//detail page
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Rest.findOne({ _id: id, userId: req.user._id })
    .lean()
    .then(function (rest) {
      res.render('show', { rest });
    })
    .catch((error) => console.error(error));
});

//修改清單
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return Rest.findOne({ _id: id, userId: req.user._id })
    .lean()
    .then(function (rest) {
      res.render('edit', { rest });
    })
    .catch((error) => console.error(error));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  return Rest.findOne({ _id: id, userId: req.user._id })
    .then((rest) => {
      rest = Object.assign(rest, req.body);
      rest.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.error(error));
});
//刪除清單
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Rest.findOne({ _id: id, userId: req.user._id })
    .then((rest) => rest.remove())
    .then(() => res.redirect(`/`))
    .catch((error) => console.error(error));
});

module.exports = router;

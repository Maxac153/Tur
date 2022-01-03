const { Router } = require('express')
const Players = require('../models/Players')
const router = Router()

router.get('/', async (req, res) => {
  const players = await Players.find({})

  res.render('index', {
    title: 'Players list',
    isIndex: true,
    players
  })
})

router.post('/', async (req, res) => {
  const players = new Players({
    fullName: req.body.fullName
  })
  await players.save()
  res.redirect('/')
})

router.delete('/', (req, res) =>{
  Players
    .findByIdAndDelete(req.body.id)
    .then(result =>{
      res.sendStatus(200);
    })
})

module.exports = router

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Players = require('./models/players');
const config = require('./config');

const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;
const db = `mongodb+srv://${config.user}:${config.password}@cluster0.795xa.mongodb.net/players?retryWrites=true&w=majority`;

//Временно не работает по понятным причинам
// mongoose
//   .connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
//   .then((res) => console.log('Connected to DB'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));
app.use(express.static('js'));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.listen(PORT, (error) =>{
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  Players
    .find()
    .then((players) => res.render(createPath('index'), {players}))
});

app.delete('/:id', (req, res) => {
  Players
    .findByIdAndDelete(req.params.id)
    .then(result =>{
      res.sendStatus(200)
    })
});

app.post('/', (req, res) => {
  const players = new Players({
    fullName: req.body.fullName
  })
  players.save()
  res.redirect('/')
}); 
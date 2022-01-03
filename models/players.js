const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playersSchema = new Schema({
  fullName: {
    type: String,
    required: true
  }
})

const Players = mongoose.model('Players', playersSchema);
module.exports = Players;
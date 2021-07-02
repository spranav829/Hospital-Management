const mongoose = require('mongoose');
const ventilatorSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  In_use:{
    type:String,
  },
  Patient_idddddd:[{
    type:String,
  }],
})
const Ventilators =mongoose.model('Ventilators',ventilatorSchema);
module.exports = Ventilators;

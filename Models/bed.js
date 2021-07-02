const mongoose = require('mongoose');
const bedSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  Floor_no:{
    type:Number
  },
  Room_no:{
    type:Number
  },
  Patient_iddddd:[{
    type:mongoose.Schema.Types.String,
    ref:'Beds'
  }],
})
const Beds =mongoose.model('Beds',bedSchema);
module.exports = Beds;

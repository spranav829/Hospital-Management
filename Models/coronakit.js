const mongoose = require('mongoose');
const coronakitSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  Payment_Status:{
    type:String
  },
  Patient_iddddddd:[{
    type:mongoose.Schema.Types.String,
    ref:'Patients'
  }],
Cost:{
  type:Number,
  min:0
}
})
const Coronakits =mongoose.model('Coronakits',coronakitSchema);
module.exports = Coronakits;

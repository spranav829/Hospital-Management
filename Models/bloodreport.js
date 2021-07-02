const mongoose = require('mongoose');
const bloodreportSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  Test_type:{
    type: String
  },
  Value:{
    type:Number
  },
  Condition:{
    type:String
  },
  Patient_idddd:[{
    type:mongoose.Schema.Types.String,
    ref:'Patients'
  }]
})
const Bloodreports =mongoose.model('Bloodreports',bloodreportSchema);
module.exports = Bloodreports;

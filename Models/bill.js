const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  Date:{
    type:String
  },
  Payment_mode:{
    type:String
  },
  Patient_iddd:[{
    type:mongoose.Schema.Types.String,
    ref:'Patients'
  }],
Consultancy_fee:{
  type:Number,
  min:0
}
})
const Bills =mongoose.model('Bills',billSchema);
module.exports = Bills;

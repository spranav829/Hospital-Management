const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  Patient_name:{
    type:String,
  },
  Password:{
    type:String,
  },
  Phone_No:{
    type:Number,
  },
  Address:{
    type:String
  },
  Doctor_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Doctors'
  }],
  Report_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Reports'
  }],
  Bill_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Bills'
  }],
  Bloodreport_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Bloodreports'
  }],
  Ventilator_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Ventilators'
  }],
  Bed_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Beds'
  }],
  Coronakit_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Coronakits'
  }]
})
const Patients =mongoose.model('Patients',patientSchema);
module.exports = Patients;

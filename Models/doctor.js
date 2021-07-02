const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  D_Name:{
    type:String,
  },
  Gender:{
    type:String,
    enum:['Male','Female','Other']
  },
  Speciality:{
    type:String
  },
  Phone_No:{
    type:Number,
  },
  Address:{
    type:String
  }
})

const Doctors =mongoose.model('Doctors',doctorSchema);
module.exports = Doctors;

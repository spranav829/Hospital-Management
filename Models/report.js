const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true,
  },
  Date_Of_Entry:{
    type:String,
  },
  Medical_History:{
    type:String,
  },
  Patient_idd:[{
    type:mongoose.Schema.Types.String,
    ref:'Patients'
  }]
})
const Reports =mongoose.model('Reports',reportSchema);
module.exports = Reports;

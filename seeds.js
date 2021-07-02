const mongoose = require('mongoose');

const Doctor = require('./Models/doctor');

const alldoctors =[
  {Doctor_id :'DR001', D_Name :'Vishal Singh', Gender:'M', Speciality:'Cardiologist', Phone_No:9874562584, Address:'34 ,S V Road, Delhi'},
  {Doctor_id :'DR002', D_Name :'Anand Jaiswal', Gender:'M', Speciality:'Neurologist', Phone_No:8749620136, Address:'322, Nariman Point, Mumbai'}]

Doctor.insertMany(alldoctors)
.then(res =>{
  console.log(res);
})
.catch(e =>{
  console.log(e);
})

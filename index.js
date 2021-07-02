const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Doctor = require('./Models/doctor');
const Patient = require('./Models/patient');
const Report = require('./Models/report');
const Bill = require('./Models/bill');
const Bloodreport = require('./Models/bloodreport')
const Bed = require('./Models/bed')
const Ventilator = require('./Models/ventilator')
const Coronakit = require('./Models/coronakit')

mongoose.connect('mongodb://localhost:27017/version', { useNewUrlParser: true, useUnifiedTopology: true, useFindandModify: false })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
  })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Section of Doctors========================================================
app.get('/doctors', async (req, res) => {
  const doctors = await Doctor.find({})
  res.render('doctors/index', { doctors })
})
app.get('/doctors/new', (req, res) => {
  res.render('doctors/new')
})
app.post('/doctors', (req, res) => {
  Doctor.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/doctors');
    }
  })
})
app.get('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id)
  res.render('doctors/show', { doctor })
})
//Section of Patients========================================================

app.get('/patients', async (req, res) => {
  const patients = await Patient.find({})
  res.render('patients/index', { patients })
})

app.get('/patients/new', (req, res) => {
  res.render('patients/new')
})

app.post('/patients', (req, res) => {
  Patient.create(req.body, function (err, d) {
    if (err) {
      console.log(err)
      res.send('Please enter a different Patient_id');
    }
    else {
      res.redirect('/');
    }
  })
})
app.get('/patients/:id', async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate('Report_idd').populate('Doctor_idd').populate('Bill_idd').populate('Bloodreport_idd').populate('Bed_idd').populate('Ventilator_idd').populate('Coronakit_idd');
  res.render('patients/show', { patient })
})
app.get('/patients/:id/doctors/new', (req, res) => {
  const { id } = req.params;
  res.render('doctors/new', { id })
})
app.post('/patients/:id/doctors', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, D_Name, Gender, Speciality, Phone_No, Address } = req.body;
  const doctor = new Doctor({ _id, D_Name, Gender, Speciality, Phone_No, Address });
  patient.Doctor_idd.push(doctor);
  await doctor.save();
  await patient.save();
  res.send(req.body)
})
app.get('/patients/:id/edit', async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/edit', { patient })
})
app.put('/patients/:id', (req, res) => {
  const id = req.params.id;
  Patient.findOneAndUpdate({ _id: id }, req.body, (err, ep) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/patients/' + id)
    }
  });
})
//Section of Reports======================================================
app.get('/reports', async (req, res) => {
  const reports = await Report.find({})
  res.render('reports/index', { reports })
})

app.get('/reports/new', (req, res) => {
  res.render('reports/new')
})
app.post('/reports', (req, res) => {
  Report.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/reports');
    }
  })
})
app.get('/patients/:id/reports/new', (req, res) => {
  const { id } = req.params;
  res.render('reports/new', { id })
})
app.post('/patients/:id/reports', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, Date_Of_Entry, Medical_History } = req.body;
  const report = new Report({ _id, Date_Of_Entry, Medical_History });
  patient.Report_idd.push(report);
  report.Patient_idd.push(patient);
  await report.save();
  await patient.save();
  res.redirect('/patients' / +id)

})
//Section of Bills=========================================================
app.get('/bills', async (req, res) => {
  const bills = await Bill.find({})
  res.render('bills/index', { bills })
})

app.get('/bills/new', (req, res) => {
  res.render('bills/new')
})
app.post('/bills', (req, res) => {
  Bill.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/bills');
    }
  })
})
app.get('/patients/:id/bills/new', (req, res) => {
  const { id } = req.params;
  res.render('bills/new', { id })
})
app.post('/patients/:id/bills', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, Date, Payment_mode, Consultancy_fee } = req.body;
  const bill = new Bill({ _id, Date, Payment_mode, Consultancy_fee });
  patient.Bill_idd.push(bill);
  bill.Patient_iddd.push(patient);
  await bill.save();
  await patient.save();
  res.redirect('/patients/' + id)

})
//Section of Bloodtests=========================================================
app.get('/bloodreports', async (req, res) => {
  const bloodreports = await Bloodreport.find({})
  res.render('bloodreports/index', { bloodreports })
})

app.get('/bloodreports/new', (req, res) => {
  res.render('bloodreports/new')
})
app.get('/patients/:id/bloodreports/new', (req, res) => {
  const { id } = req.params;
  res.render('bloodreports/new', { id })
})
app.post('/patients/:id/bloodreports', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, Test_type, Value, Condition } = req.body;
  const bloodreport = new Bloodreport({ _id, Test_type, Value, Condition });
  patient.Bloodreport_idd.push(bloodreport);
  bloodreport.Patient_idddd.push(patient);
  await bloodreport.save();
  await patient.save();
  res.redirect('/patients/' + id)
})
//Section of Beds==============================================================
app.get('/beds', async (req, res) => {
  const beds = await Bed.find({})
  res.render('beds/index', { beds })
})

app.get('/beds/new', (req, res) => {
  res.render('beds/new')
})
app.post('/beds', (req, res) => {
  Bed.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/beds');
    }
  })
})
app.get('/patients/:id/beds/new', (req, res) => {
  const { id } = req.params;
  res.render('beds/new', { id })
})
app.post('/patients/:id/beds', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, Floor_no, Room_no } = req.body;
  const bed = new Bed({ _id, Floor_no, Room_no });
  patient.Bed_idd.push(bed);
  bed.Patient_iddddd.push(patient);
  await bed.save();
  await patient.save();
  res.redirect('/patients/' + id)

})
//Section of ventilator=================================================
app.get('/ventilators', async (req, res) => {
  const ventilators = await Ventilator.find({})
  res.render('ventilators/index', { ventilators })
})

app.get('/ventilators/new', (req, res) => {
  res.render('ventilators/new')
})
app.post('/ventilators', (req, res) => {
  Ventilator.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/ventilators');
    }
  })
})
app.get('/patients/:id/ventilators/new', (req, res) => {
  const { id } = req.params;
  res.render('ventilators/new', { id })
})
app.post('/patients/:id/ventilators', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, In_use } = req.body;
  const ventilator = new Ventilator({ _id, In_use });
  patient.Ventilator_idd.push(ventilator);
  ventilator.Patient_idddddd.push(patient);
  await ventilator.save();
  await patient.save();
  res.redirect('/patients/' + id)
})
//Section of Corona Coronakit================================
app.get('/coronakits', async (req, res) => {
  const coronakits = await Coronakit.find({})
  res.render('coronakits/index', { coronakits })
})

app.get('/coronakits/new', (req, res) => {
  res.render('coronakits/new')
})
app.post('/coronakits', (req, res) => {
  Coronakit.create(req.body, function (err, d) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/coronakits');
    }
  })
})
app.get('/patients/:id/coronakits/new', (req, res) => {
  const { id } = req.params;
  res.render('coronakits/new', { id })
})
app.post('/patients/:id/coronakits', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  const { _id, Payment_Status, Cost } = req.body;
  const coronakit = new Coronakit({ _id, Payment_Status, Cost });
  patient.Coronakit_idd.push(coronakit);
  coronakit.Patient_iddddddd.push(patient);
  await coronakit.save();
  await patient.save();
  res.redirect('/patients/' + id)
})
//Main Routes==================================================================
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/aboutus', (req, res) => {
  res.render('aboutus')
})
app.get('/selfasses', (req, res) => {
  var m;
  res.render('selfasses', { m })
})
app.get('/print', (req, res) => {
  res.render('print')
})
app.post('/selfasses', (req, res) => {
  var e = req.body.symptoms;
  if (e == "breathingdifficulty") {
    var m = "You seem serious and we recommed you to get admitted and sign up as soon as possible";
  }
  else if (e == "chestcongestion") {
    var m = "You seem serious and we recommed you to get admitted and sign up as soon as possible";
  }
  else {
    var m = "You do not show any serious symptoms so to be on a safer side quarantine yourself for 14 days and diagnose yourself again";
  }
  res.render('selfasses', { m })
})
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const patient = await Patient.findOne({ _id: username });
  const id = patient._id;
  if (password === patient.Password) {
    res.redirect('/patients/' + id)
  }
  else {
    res.send('Error')
  }
})
app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!")
})

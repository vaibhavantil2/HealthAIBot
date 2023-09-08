// src/app.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Patient, Disease, PatientReport, PatientHistory } from './models';
import PatientModel from './models/Patient';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DiseaseModel = mongoose.model<Disease>('Disease', new mongoose.Schema<Disease>({
  id: String,
  name: String,
  symptoms: [String],
  checkUps: [String],
}));

const PatientReportModel = mongoose.model<PatientReport>('PatientReport', new mongoose.Schema<PatientReport>({
  id: String,
  patient_id: String,
  report_text: String,
}));


// Routes
app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.get('/api/patients/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient: Patient = await PatientModel.findOne({ id: patientId });
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/reports/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const reports: PatientReport = await PatientReportModel.find({ patient_id: patientId });
    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add more routes for diseases, analysis, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

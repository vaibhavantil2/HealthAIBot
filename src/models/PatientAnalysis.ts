// src/models/PatientAnalysis.ts
import mongoose, { Document } from 'mongoose';

// Define the PatientAnalysis schema
const patientAnalysisSchema = new mongoose.Schema({
  patient_id: String,
  analysis_result: String,
});

// Define the PatientAnalysis model
export interface PatientAnalysis extends Document {
  patient_id: string;
  analysis_result: string;
}

const PatientAnalysisModel = mongoose.model<PatientAnalysis>('PatientAnalysis', patientAnalysisSchema);

export default PatientAnalysisModel;

// src/models/PatientHistory.ts
import mongoose, { Document, Model } from 'mongoose';

// Define the PatientHistory schema
const patientHistorySchema = new mongoose.Schema({
  id: String,
  patient_id: String,
  diagnosis: String,
  treatment: String,
  medication: String,
  lab_results: String,
  follow_up_date: Date,
  notes: String,
  medical_certificates: String,
  illnessrecord: String,
  physicaldisability: String,
  cancer: Boolean,
  diabetic: Boolean
});

// Define the PatientHistory model
export interface PatientHistory extends Document {
  id: string;
  patient_id: string;
  diagnosis: string;
  treatment: string;
  medication: string;
  lab_results: string;
  follow_up_date: Date;
  notes: string;
  medical_certificates: string;
  illnessrecord: string;
  physicaldisability: string;
  cancer: boolean;
  diabetic: boolean;
  // Add any other medical-related PII fields as needed
}

interface PatientHistoryModel extends Model<PatientHistory> {
  createPatientHistory(historyData: PatientHistory): Promise<PatientHistory>;
  updatePatientHistory(historyId: string, historyData: Partial<PatientHistory>): Promise<PatientHistory | null>;
}

patientHistorySchema.statics.createPatientHistory = async function (historyData: PatientHistory) {
  return PatientHistoryModel.create(historyData);
};

patientHistorySchema.statics.updatePatientHistory = async function (historyId: string, historyData: Partial<PatientHistory>) {
  return PatientHistoryModel.findByIdAndUpdate(historyId, historyData, { new: true });
};

const PatientHistoryModel = mongoose.model<PatientHistory, PatientHistoryModel>('PatientHistory', patientHistorySchema);

export default PatientHistoryModel;

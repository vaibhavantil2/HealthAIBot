// src/models/Patient.ts
import mongoose, { Document, Model } from 'mongoose';

// Define the Patient schema
const patientSchema = new mongoose.Schema({
  id: String,
  patientName: String,
  age: Number,
  address: String,
  contact_details: String,
  aadhar: String,
  dob: String,
  gender: String
});

// Define the Patient model
export interface Patient extends Document {
  id: string;
  patientName: string;
  age: number;
  address: string;
  contact_details: string;
  aadhar: string;
  dob: string;
  gender: string;
}

const PatientModel = mongoose.model<Patient, Patient>('Patient', patientSchema);

export default PatientModel;
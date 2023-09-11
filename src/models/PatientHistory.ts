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
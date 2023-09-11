// Define the Patient model
export interface Patient extends Document {
  id: string;
  patientName: string;
  age: number;
  address: string;
  contact_details: string;
  ssn: string;
  dob: string;
  gender: string;
}
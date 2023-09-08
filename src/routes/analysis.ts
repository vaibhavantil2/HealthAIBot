// src/routes/analysis.ts
import express from 'express';
import openai from 'openai';
import PatientHistoryModel, { PatientHistory } from '../models/PatientHistory'; // Import the PatientHistory model
import PatientAnalysisModel from '../models/PatientAnalysis';
import PatientModel, { Patient } from '../models/Patient';

const router = express.Router();

// Configure your OpenAI API key
openai.configure({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key
});

// Define a route for analyzing patient health data
router.post('/analyze_health/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const { symptoms } = req.body;

  // Retrieve patient data and history from MongoDB
  try {
    const patient = await PatientModel.findOne({ id: patientId });
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }

    // Retrieve patient history
    const patientHistory: PatientHistory = await PatientHistoryModel.findOne({ patient_id: patientId });

    // Format data for OpenAI analysis
    const prompt = `Patient Gender: ${patient.gender}, Age: ${patient.age}, Aadhar: ${patient.aadhar} \nSymptoms: ${symptoms}\nPatient History: ${
      patientHistory ? patientHistory.diagnosis : 'No history available'
    }\nPredict possible diseases:`;

    // Perform analysis using OpenAI
    const { choices } = await openai.Completion.create({
      engine: 'davinci',
      prompt,
      max_tokens: 50, // Adjust as needed
    });

    const analysisResult = choices[0]?.text || 'No analysis available';

    // Store the analysis result in MongoDB
    const newAnalysis = new PatientAnalysisModel({
      patient_id: patientId,
      analysis_result: analysisResult,
    });

    await newAnalysis.save();

    res.json({ analysisResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

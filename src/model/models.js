import { emailSchema } from './schema/email';
import { patientSchema } from './schema/patient';
import mongoose from 'mongoose';

export const Email = mongoose.model('Email', emailSchema);
export const Patient = mongoose.model('Patient', patientSchema);

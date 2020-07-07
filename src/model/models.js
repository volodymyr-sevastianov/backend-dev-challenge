import mongoose from 'mongoose';

import { emailSchema } from './schema/email';
import { patientSchema } from './schema/patient';

export const Email = mongoose.model('Email', emailSchema);
export const Patient = mongoose.model('Patient', patientSchema);

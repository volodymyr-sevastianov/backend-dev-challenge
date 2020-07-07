import { Schema } from 'mongoose';

export const emailSchema = new Schema({
  patient_id: 'ObjectId',
  name: String,
  scheduledDate: { type: Date },
});

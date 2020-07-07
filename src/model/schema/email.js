import { Schema } from 'mongoose';

export const emailSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  name: String,
  scheduledDate: { type: Date },
});

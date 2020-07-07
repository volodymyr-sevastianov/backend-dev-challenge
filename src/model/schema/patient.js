import { Schema } from 'mongoose';

export const patientSchema = new Schema({
  programIdentifier: Number,
  dataSource: String,
  cardNumber: Number,
  memberId: Number,
  firstName: String,
  lastName: String,
  dateOfBirth: {
    type: Date,
    max: [new Date(), 'Birthday date can`t be bigger then today`s date. Received value: {VALUE}.'],
  },
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipCode: Number,
  telephoneNumber: String,
  emailAddress: {
    type: String,
    validate: {
      validator: value => {
        if (!value) {
          return true;
        }
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          value,
        );
      },
      message: 'Email has incorrect pattern. Received value: {VALUE}',
    },
  },
  consent: {
    type: String,
    enum: ['Y', 'N'],
    default: 'N',
  },
  mobilePhone: String,
});

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  comorbidities?: string;
  medications?: {
    name: string;
    notes?: string;
  }[];
  physicalRestrictions?: string;
  injuries?: string;
  consentGiven: boolean;
}

const HealthRecordSchema: Schema<IHealthRecord> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    comorbidities: {
      type: String,
    },
    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
        },
      },
    ],
    physicalRestrictions: {
      type: String,
    },
    injuries: {
      type: String,
    },
    consentGiven: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HealthRecord: Model<IHealthRecord> = mongoose.models.HealthRecord || mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);

export default HealthRecord;

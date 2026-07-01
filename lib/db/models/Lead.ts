import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatus = 'lead' | 'contacted' | 'interested' | 'enrolled' | 'lost';

export interface ILead extends Document {
  name: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  source?: string;
  notes?: string;
  convertedToStudent?: mongoose.Types.ObjectId;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['lead', 'contacted', 'interested', 'enrolled', 'lost'],
      default: 'lead',
      required: true,
    },
    source: {
      type: String, // ex: Instagram, Google, Indicação
    },
    notes: {
      type: String,
    },
    convertedToStudent: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
  }
);

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;

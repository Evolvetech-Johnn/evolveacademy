import mongoose, { Schema, Document, Model } from 'mongoose';

export type InteractionType = 'call' | 'message' | 'meeting' | 'note';

export interface IInteraction extends Document {
  studentId?: mongoose.Types.ObjectId;
  leadId?: mongoose.Types.ObjectId;
  type: InteractionType;
  content: string;
  createdBy: mongoose.Types.ObjectId;
}

const InteractionSchema: Schema<IInteraction> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
    },
    type: {
      type: String,
      enum: ['call', 'message', 'meeting', 'note'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interaction: Model<IInteraction> = mongoose.models.Interaction || mongoose.model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;

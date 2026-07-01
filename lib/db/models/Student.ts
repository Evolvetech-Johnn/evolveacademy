import mongoose, { Schema, Document, Model } from 'mongoose';

export type StudentStatus = 'active' | 'inactive' | 'at_risk' | 'locked';

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  planId?: mongoose.Types.ObjectId;
  status: StudentStatus;
  riskReason?: string;
  lastAttendance?: Date;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'at_risk', 'locked'],
      default: 'active',
      required: true,
    },
    riskReason: {
      type: String,
    },
    lastAttendance: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;

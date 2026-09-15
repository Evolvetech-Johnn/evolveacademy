import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IModule extends Document {
  courseId: mongoose.Types.ObjectId;
  order: number;
  title: string;
}

const ModuleSchema: Schema<IModule> = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Module: Model<IModule> = mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);

export default Module;

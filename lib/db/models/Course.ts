import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  slug: string;
  title: string;
  description: string;
  price?: number;
  isPublished: boolean;
}

const CourseSchema: Schema<ICourse> = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;

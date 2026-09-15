import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  order: number;
  slug: string;
  title: string;
  objetivo: string;
  conceito: string;
  aprofundamento: string;
  exemploPratico: string;
  contraexemplo: string;
  erroComum: string;
  exercicio: string;
  paraIrAlem: string;
  isFreePreview: boolean;
}

const LessonSchema: Schema<ILesson> = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
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
    objetivo: {
      type: String,
      required: true,
    },
    conceito: {
      type: String,
      required: true,
    },
    aprofundamento: {
      type: String,
      required: true,
    },
    exemploPratico: {
      type: String,
      required: true,
    },
    contraexemplo: {
      type: String,
      required: true,
    },
    erroComum: {
      type: String,
      required: true,
    },
    exercicio: {
      type: String,
      required: true,
    },
    paraIrAlem: {
      type: String,
      required: true,
    },
    isFreePreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson: Model<ILesson> = mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);

export default Lesson;

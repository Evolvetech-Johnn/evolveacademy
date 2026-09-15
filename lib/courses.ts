import dbConnect from './db/mongoose';
import Course, { ICourse } from './db/models/Course';
import Module, { IModule } from './db/models/Module';
import Lesson, { ILesson } from './db/models/Lesson';
import Enrollment from './db/models/Enrollment';

export interface PlainLesson {
  _id: string;
  moduleId: string;
  order: number;
  slug: string;
  title: string;
  isFreePreview: boolean;
}

export interface PlainModule {
  _id: string;
  order: number;
  title: string;
  lessons: PlainLesson[];
}

function toPlainLesson(lesson: ILesson): PlainLesson {
  return {
    _id: lesson._id.toString(),
    moduleId: lesson.moduleId.toString(),
    order: lesson.order,
    slug: lesson.slug,
    title: lesson.title,
    isFreePreview: lesson.isFreePreview,
  };
}

export async function getCourseWithModules(courseSlug: string): Promise<{
  course: ICourse;
  modules: PlainModule[];
} | null> {
  await dbConnect();

  const course = await Course.findOne({ slug: courseSlug, isPublished: true });
  if (!course) return null;

  const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });
  const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 });

  const plainModules: PlainModule[] = modules.map((mod) => ({
    _id: mod._id.toString(),
    order: mod.order,
    title: mod.title,
    lessons: lessons
      .filter((lesson) => lesson.moduleId.toString() === mod._id.toString())
      .map(toPlainLesson),
  }));

  return { course, modules: plainModules };
}

export async function getLessonBySlug(slug: string): Promise<ILesson | null> {
  await dbConnect();
  return Lesson.findOne({ slug });
}

/**
 * ponytail: acesso liberado automaticamente para qualquer usuário logado até o
 * checkout entrar no Split 2 — trocar por verificação de pagamento confirmado.
 */
export async function ensureEnrollment(userId: string, courseId: string): Promise<void> {
  await dbConnect();
  await Enrollment.findOneAndUpdate(
    { userId, courseId },
    { userId, courseId, status: 'active' },
    { upsert: true }
  );
}

export async function hasActiveEnrollment(userId: string, courseId: string): Promise<boolean> {
  await dbConnect();
  const enrollment = await Enrollment.findOne({ userId, courseId, status: 'active' });
  return !!enrollment;
}

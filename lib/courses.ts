import { supabase } from './supabase';
import type { Course, CourseModule, Lesson } from './types';

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

export interface LessonDetail {
  id: string;
  courseId: string;
  moduleId: string;
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

function toPlainLesson(lesson: Lesson): PlainLesson {
  return {
    _id: lesson.id,
    moduleId: lesson.module_id,
    order: lesson.position,
    slug: lesson.slug,
    title: lesson.title,
    isFreePreview: lesson.is_free_preview,
  };
}

function toLessonDetail(lesson: Lesson): LessonDetail {
  return {
    id: lesson.id,
    courseId: lesson.course_id,
    moduleId: lesson.module_id,
    order: lesson.position,
    slug: lesson.slug,
    title: lesson.title,
    objetivo: lesson.objetivo,
    conceito: lesson.conceito,
    aprofundamento: lesson.aprofundamento,
    exemploPratico: lesson.exemplo_pratico,
    contraexemplo: lesson.contraexemplo,
    erroComum: lesson.erro_comum,
    exercicio: lesson.exercicio,
    paraIrAlem: lesson.para_ir_alem,
    isFreePreview: lesson.is_free_preview,
  };
}

export async function getCourseWithModules(courseSlug: string): Promise<{
  course: Course;
  modules: PlainModule[];
} | null> {
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
    .eq('is_published', true)
    .single<Course>();

  if (!course) return null;

  const [{ data: modules }, { data: lessons }] = await Promise.all([
    supabase.from('modules').select('*').eq('course_id', course.id).order('position').returns<CourseModule[]>(),
    supabase.from('lessons').select('*').eq('course_id', course.id).order('position').returns<Lesson[]>(),
  ]);

  const plainModules: PlainModule[] = (modules ?? []).map((mod) => ({
    _id: mod.id,
    order: mod.position,
    title: mod.title,
    lessons: (lessons ?? []).filter((lesson) => lesson.module_id === mod.id).map(toPlainLesson),
  }));

  return { course, modules: plainModules };
}

export async function getLessonBySlug(slug: string): Promise<LessonDetail | null> {
  const { data: lesson } = await supabase.from('lessons').select('*').eq('slug', slug).single<Lesson>();
  return lesson ? toLessonDetail(lesson) : null;
}

export interface LessonNavLink {
  slug: string;
  title: string;
}

export interface LessonProgress {
  moduleTitle: string;
  moduleOrder: number;
  totalModules: number;
  positionInModule: number;
  totalInModule: number;
  positionInCourse: number;
  totalInCourse: number;
}

export async function getLessonNavigation(
  courseSlug: string,
  currentSlug: string
): Promise<{ prev: LessonNavLink | null; next: LessonNavLink | null; progress: LessonProgress | null }> {
  const data = await getCourseWithModules(courseSlug);
  if (!data) return { prev: null, next: null, progress: null };

  const sequence = data.modules.flatMap((mod) => mod.lessons);
  const currentIndex = sequence.findIndex((lesson) => lesson.slug === currentSlug);
  if (currentIndex === -1) return { prev: null, next: null, progress: null };

  const prevLesson = sequence[currentIndex - 1];
  const nextLesson = sequence[currentIndex + 1];
  const currentModule = data.modules.find((mod) => mod._id === sequence[currentIndex].moduleId) ?? null;
  const positionInModule = currentModule
    ? currentModule.lessons.findIndex((lesson) => lesson.slug === currentSlug) + 1
    : 0;

  return {
    prev: prevLesson ? { slug: prevLesson.slug, title: prevLesson.title } : null,
    next: nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : null,
    progress: currentModule
      ? {
          moduleTitle: currentModule.title,
          moduleOrder: currentModule.order,
          totalModules: data.modules.length,
          positionInModule,
          totalInModule: currentModule.lessons.length,
          positionInCourse: currentIndex + 1,
          totalInCourse: sequence.length,
        }
      : null,
  };
}

/**
 * ponytail: acesso liberado automaticamente para qualquer usuário logado até o
 * checkout entrar no Split 2 — trocar por verificação de pagamento confirmado.
 */
export async function ensureEnrollment(userId: string, courseId: string): Promise<void> {
  await supabase
    .from('enrollments')
    .upsert({ user_id: userId, course_id: courseId, status: 'active' }, { onConflict: 'user_id,course_id' });
}

export async function hasActiveEnrollment(userId: string, courseId: string): Promise<boolean> {
  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('status', 'active')
    .maybeSingle();
  return !!data;
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Course } from '@/lib/types';

// ponytail: fase inicial de testes, sem autenticação — reintroduzir o gate de
// sessão aqui quando o login voltar.
export async function GET() {
  try {
    const [courseCount, moduleCount, lessonCount, enrollmentCount, { data: courses }] = await Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }).then((r) => r.count ?? 0),
      supabase.from('modules').select('id', { count: 'exact', head: true }).then((r) => r.count ?? 0),
      supabase.from('lessons').select('id', { count: 'exact', head: true }).then((r) => r.count ?? 0),
      supabase
        .from('enrollments')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .then((r) => r.count ?? 0),
      supabase.from('courses').select('*').order('created_at', { ascending: false }).returns<Course[]>(),
    ]);

    const coursesWithEnrollments = await Promise.all(
      (courses ?? []).map(async (course) => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        isPublished: course.is_published,
        enrollments:
          (
            await supabase
              .from('enrollments')
              .select('id', { count: 'exact', head: true })
              .eq('course_id', course.id)
              .eq('status', 'active')
          ).count ?? 0,
      }))
    );

    return NextResponse.json({
      metrics: { courseCount, moduleCount, lessonCount, enrollmentCount },
      courses: coursesWithEnrollments,
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import dbConnect from '@/lib/db/mongoose';
import { Course, Module, Lesson, Enrollment } from '@/lib/db/models';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'owner' && session.user.role !== 'professor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const [courseCount, moduleCount, lessonCount, enrollmentCount, courses] = await Promise.all([
      Course.countDocuments(),
      Module.countDocuments(),
      Lesson.countDocuments(),
      Enrollment.countDocuments({ status: 'active' }),
      Course.find().sort({ createdAt: -1 }),
    ]);

    const coursesWithEnrollments = await Promise.all(
      courses.map(async (course) => ({
        id: course._id.toString(),
        title: course.title,
        slug: course.slug,
        isPublished: course.isPublished,
        enrollments: await Enrollment.countDocuments({ courseId: course._id, status: 'active' }),
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

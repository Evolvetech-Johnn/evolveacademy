'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardData {
  metrics: {
    courseCount: number;
    moduleCount: number;
    lessonCount: number;
    enrollmentCount: number;
  };
  courses: {
    id: string;
    title: string;
    slug: string;
    isPublished: boolean;
    enrollments: number;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  const metrics = data?.metrics || { courseCount: 0, moduleCount: 0, lessonCount: 0, enrollmentCount: 0 };
  const courses = data?.courses || [];

  const cards = [
    { label: 'Cursos publicados', value: metrics.courseCount },
    { label: 'Módulos', value: metrics.moduleCount },
    { label: 'Aulas', value: metrics.lessonCount },
    { label: 'Matrículas ativas', value: metrics.enrollmentCount },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base">Dashboard</h1>
        <p className="text-text mt-1">Visão geral da plataforma de cursos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="p-6 border border-gray-100 rounded-xl bg-surface">
            <p className="text-sm font-medium text-text">{card.label}</p>
            <p className="text-3xl font-bold text-base mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 border border-gray-100 rounded-xl bg-surface">
        <h2 className="text-lg font-semibold text-base mb-4">Cursos</h2>
        {courses.length === 0 ? (
          <p className="text-text">
            Nenhum curso cadastrado ainda. Rode <code>npm run seed:course</code> para popular o primeiro curso.
          </p>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium text-base">{course.title}</p>
                  <p className="text-sm text-text">
                    {course.isPublished ? 'Publicado' : 'Rascunho'} · {course.enrollments} matrícula(s)
                  </p>
                </div>
                <Link
                  href={`/cursos/${course.slug}`}
                  className="text-accent-primary font-medium hover:underline"
                >
                  Ver página →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

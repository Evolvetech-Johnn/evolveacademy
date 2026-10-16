import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCourseWithModules } from '@/lib/courses';
import { COURSE_CONTENT } from '@/lib/courseContent';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Meus cursos | Evolveacademy',
};

export default async function MeusCursosPage() {
  const slugs = Object.keys(COURSE_CONTENT);
  const results = await Promise.all(slugs.map((slug) => getCourseWithModules(slug)));
  const courses = slugs.flatMap((slug, i) => (results[i] ? [{ slug, ...results[i] }] : []));

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-base mb-6 sm:mb-8">Meus cursos</h1>

        {courses.length === 0 && <p className="text-text">Nenhum curso disponível no momento.</p>}
        {courses.map(({ slug, course, modules }) => (
          <div key={course.id} className="border border-gray-100 rounded-xl bg-surface p-4 sm:p-6 mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-base mb-1">{course.title}</h2>
            <p className="text-text mb-6 text-justify">{course.description}</p>

            <div className="space-y-6">
              {modules.map((mod) => (
                <div key={mod._id}>
                  <h3 className="font-semibold text-base mb-2">
                    Módulo {mod.order} — {mod.title}
                  </h3>
                  <ul className="space-y-1 pl-2 sm:pl-4">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson._id}>
                        <Link
                          href={`/cursos/${slug}/aulas/${lesson.slug}`}
                          className="text-text hover:text-accent-secondary transition-colors block py-1.5"
                        >
                          {lesson.order}. {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}

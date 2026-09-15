import Link from 'next/link';
import Section from './Section';
import type { Course } from '../lib/types';

interface FeaturedCoursesProps {
  courses: Pick<Course, 'slug' | 'title' | 'description'>[];
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  return (
    <Section id="cursos">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">Cursos em destaque</h2>
        <p className="text-lg text-text max-w-2xl">
          Conteúdo produzido pela EvolveTech Solutions, direto ao ponto e aplicável no seu negócio.
        </p>
      </div>
      {courses.length === 0 ? (
        <p className="text-text">Novos cursos em breve.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.slug} className="p-6 border border-gray-100 rounded-xl bg-surface flex flex-col">
              <h3 className="text-xl font-semibold text-base mb-2">{course.title}</h3>
              <p className="text-text mb-6 flex-1">{course.description}</p>
              <Link
                href={`/cursos/${course.slug}`}
                className="px-5 py-2.5 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors text-center"
              >
                Ver curso
              </Link>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

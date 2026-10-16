import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CourseHero from '../../../components/CourseHero';
import Benefits from '../../../components/Benefits';
import ModuleAccordion from '../../../components/ModuleAccordion';
import SocialProof from '../../../components/SocialProof';
import Faq from '../../../components/Faq';
import CourseCtaFinal from '../../../components/CourseCtaFinal';
import { getCourseWithModules } from '../../../lib/courses';
import { COURSE_CONTENT } from '../../../lib/courseContent';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
  params: Promise<{ course: string }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { course } = await params;
  const content = COURSE_CONTENT[course];
  return content ? { title: content.metaTitle, description: content.metaDescription } : {};
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course } = await params;
  const content = COURSE_CONTENT[course];
  if (!content) notFound();

  const data = await getCourseWithModules(course);
  if (!data) notFound();

  const { modules } = data;
  const firstLessonSlug =
    modules.flatMap((m) => m.lessons).find((l) => l.isFreePreview)?.slug ?? modules[0]?.lessons[0]?.slug ?? '';

  const benefits = content.benefits.map(({ iconPath, title, description }) => ({
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    ),
    title,
    description,
  }));

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <CourseHero course={course} title={content.heroTitle} text={content.heroText} freeLessonSlug={firstLessonSlug} />
        <Benefits
          id="o-que-voce-aprende"
          title="O que você vai aprender"
          subtitle={content.benefitsSubtitle}
          items={benefits}
        />
        <ModuleAccordion
          course={course}
          modules={modules}
          hooks={content.moduleHooks}
          subtitle={content.modulesSubtitle}
        />
        <SocialProof authorities={content.authorities} text={content.trustText} />
        <Faq items={content.faq} />
      </main>
      <CourseCtaFinal course={course} title={content.ctaTitle} text={content.ctaText} freeLessonSlug={firstLessonSlug} />
      <Footer />
    </div>
  );
}

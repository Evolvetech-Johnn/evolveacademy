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

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Curso de Marketing: do Zero ao Avançado | Evolveacademy',
  description:
    '7 módulos, 42 aulas — os frameworks de Kotler, Cialdini, Ogilvy e Christensen aplicados em exercícios práticos para o marketing do seu negócio.',
};

const courseBenefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Diagnóstico antes de campanha',
    description: 'Pare de tratar marketing como "postar mais" e comece a diagnosticar o problema real antes de qualquer ação.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Copy com estrutura, não sorte',
    description: 'Escreva anúncios, e-mails e páginas de venda com AIDA, PAS e StoryBrand em vez de tentar improvisar.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Métrica pela lucratividade real',
    description: 'Leia CPA, ROAS e LTV:CAC pelo que realmente importa para o caixa, não pelo número bonito no relatório.',
  },
];

export default async function CourseMarketingPage() {
  const data = await getCourseWithModules('marketing');
  if (!data) notFound();

  const { modules } = data;
  const freeLesson = modules.flatMap((m) => m.lessons).find((l) => l.isFreePreview);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <CourseHero freeLessonSlug={freeLesson?.slug ?? modules[0]?.lessons[0]?.slug ?? ''} />
        <Benefits
          id="o-que-voce-aprende"
          title="O que você vai aprender"
          subtitle="Não é lista de tópicos — é o que muda na prática do seu marketing."
          items={courseBenefits}
        />
        <ModuleAccordion modules={modules} />
        <SocialProof />
        <Faq />
      </main>
      <CourseCtaFinal />
      <Footer />
    </div>
  );
}

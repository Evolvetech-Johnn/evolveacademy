import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLessonBySlug, getLessonNavigation } from '@/lib/courses';

export const dynamic = 'force-dynamic';

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

const contentFields: { key: keyof NonNullable<Awaited<ReturnType<typeof getLessonBySlug>>>; label: string }[] = [
  { key: 'objetivo', label: 'Objetivo' },
  { key: 'conceito', label: 'Conceito central' },
  { key: 'aprofundamento', label: 'Aprofundamento tático' },
  { key: 'exemploPratico', label: 'Exemplo prático' },
  { key: 'contraexemplo', label: 'Contraexemplo' },
  { key: 'erroComum', label: 'Erro comum' },
  { key: 'exercicio', label: 'Exercício de fixação' },
  { key: 'paraIrAlem', label: 'Para ir além' },
];

// ponytail: fase inicial de testes, acesso liberado a qualquer visitante, sem
// login/matrícula — reativar o gate (lib/courses.ts tem ensureEnrollment/
// hasActiveEnrollment prontos) quando o curso passar a ser pago.
export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  const { prev, next } = await getLessonNavigation('marketing', slug);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-16">
        <Link href="/cursos/marketing" className="text-accent-secondary font-medium hover:underline">
          ← Voltar para o curso
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base mt-4 mb-6 sm:mb-8 leading-snug">{lesson.title}</h1>

        <div className="space-y-6 sm:space-y-8">
          {contentFields.map(({ key, label }) => (
            <div key={key}>
              <h2 className="text-sm sm:text-lg font-semibold text-accent-secondary mb-2">{label}</h2>
              <p className="text-text whitespace-pre-line leading-relaxed text-justify">{String(lesson[key])}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
          {prev ? (
            <Link
              href={`/cursos/marketing/aulas/${prev.slug}`}
              className="flex-1 px-5 py-3.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="block text-xs text-text mb-1">← Aula anterior</span>
              <span className="block font-semibold text-base">{prev.title}</span>
            </Link>
          ) : (
            <Link
              href="/cursos/marketing"
              className="flex-1 px-5 py-3.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="block text-xs text-text mb-1">←</span>
              <span className="block font-semibold text-base">Voltar para o curso</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/cursos/marketing/aulas/${next.slug}`}
              className="flex-1 px-5 py-3.5 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20 hover:bg-accent-secondary/15 transition-colors text-right"
            >
              <span className="block text-xs text-accent-secondary mb-1">Próxima aula →</span>
              <span className="block font-semibold text-base">{next.title}</span>
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLessonBySlug, ensureEnrollment, hasActiveEnrollment } from '@/lib/courses';

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

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  const session = await getServerSession(authOptions);

  let hasAccess = lesson.isFreePreview;
  if (!hasAccess && session?.user?.id) {
    await ensureEnrollment(session.user.id, lesson.courseId);
    hasAccess = await hasActiveEnrollment(session.user.id, lesson.courseId);
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-3xl mx-auto px-8 md:px-12 py-16">
        <Link href="/cursos/marketing" className="text-accent-secondary font-medium hover:underline">
          ← Voltar para o curso
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-base mt-4 mb-8">{lesson.title}</h1>

        {hasAccess ? (
          <div className="space-y-8">
            {contentFields.map(({ key, label }) => (
              <div key={key}>
                <h2 className="text-lg font-semibold text-accent-secondary mb-2">{label}</h2>
                <p className="text-text whitespace-pre-line leading-relaxed">{String(lesson[key])}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl bg-surface p-8">
            <h2 className="text-lg font-semibold text-accent-secondary mb-2">Objetivo</h2>
            <p className="text-text leading-relaxed mb-8">{lesson.objetivo}</p>
            <p className="text-text mb-6">
              Entre na sua conta para continuar esta aula e ter acesso a todo o curso.
            </p>
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(`/cursos/marketing/aulas/${lesson.slug}`)}`}
              className="inline-block px-6 py-3.5 bg-accent-secondary text-base font-semibold rounded-lg hover:bg-accent-secondary/90 transition-colors"
            >
              Entrar para continuar
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import FeaturedCourses from '../components/FeaturedCourses';
import Footer from '../components/Footer';
import dbConnect from '../lib/db/mongoose';
import Course from '../lib/db/models/Course';

export const dynamic = 'force-dynamic';

const platformBenefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Conteúdo aplicável',
    description: 'Cada aula tem conceito, exemplo real, contraexemplo e exercício — nada de teoria sem prática.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Feito por quem executa',
    description: 'Produzido pela EvolveTech Solutions a partir do que aplicamos de fato com clientes reais.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Acesso vitalício',
    description: 'Sem mensalidade escondida: você estuda no seu ritmo e revisita qualquer módulo quando precisar.',
  },
];

async function getPublishedCourses() {
  try {
    await dbConnect();
    return await Course.find({ isPublished: true }).select('slug title description').sort({ createdAt: 1 });
  } catch {
    return [];
  }
}

export default async function Home() {
  const courses = await getPublishedCourses();

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <Hero />
        <Benefits
          id="beneficios"
          title="Por que aprender na Evolveacademy"
          subtitle="A mesma metodologia que a EvolveTech Solutions usa com clientes, agora em formato de curso."
          items={platformBenefits}
        />
        <FeaturedCourses courses={courses} />
      </main>
      <Footer />
    </div>
  );
}

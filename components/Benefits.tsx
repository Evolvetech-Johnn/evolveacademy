'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants, cardVariants } from '../animations/variants';
import Section from './Section';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Gestão de alunos',
    description: 'Cadastre e acompanhe todos os alunos com histórico completo de matrículas e pagamentos.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Planos e mensalidades',
    description: 'Crie planos customizados e controle pagamentos em atraso de forma automática.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Relatórios em tempo real',
    description: 'Visualize faturamento, ocupação e performance da sua academia em dashboards claros.',
  },
];

export default function Benefits() {
  return (
    <Section id="beneficios">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">
          Tudo que você precisa em um só sistema
        </h2>
        <p className="text-lg text-text max-w-2xl">
          Funcionalidades práticas, desenvolvidas especificamente para academias brasileiras.
        </p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-6"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="p-6 border border-gray-100 rounded-xl bg-surface"
          >
            <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center text-accent-primary mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold text-base mb-2">{benefit.title}</h3>
            <p className="text-text">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

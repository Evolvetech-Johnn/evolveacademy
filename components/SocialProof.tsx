'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';

const authorities = [
  { name: 'Philip Kotler & David Aaker', note: '4 Ps, marca e posicionamento' },
  { name: 'Robert Cialdini', note: 'gatilhos de persuasão' },
  { name: 'David Ogilvy', note: 'headline e copy de resposta direta' },
  { name: 'Clayton Christensen', note: 'Jobs to Be Done' },
  { name: 'Donald Miller', note: 'StoryBrand aplicado a vendas' },
  { name: 'Dave McClure', note: 'AARRR e métricas de growth' },
];

export default function SocialProof() {
  return (
    <Section>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">
          Por que confiar nesta metodologia
        </h2>
        <p className="text-lg text-text max-w-2xl text-justify">
          O curso não inventa teoria nova — organiza, num sistema único, os frameworks que sustentam
          decisões de marketing profissional há décadas e continuam validados. Cada aula segue a mesma
          estrutura: conceito central com a fonte original, aprofundamento tático, exemplo prático,
          contraexemplo real, erro comum e exercício de fixação.
        </p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {authorities.map((authority) => (
          <motion.div
            key={authority.name}
            variants={itemVariants}
            className="p-6 border border-gray-100 rounded-xl bg-surface"
          >
            <p className="font-semibold text-base">{authority.name}</p>
            <p className="text-text mt-1">{authority.note}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

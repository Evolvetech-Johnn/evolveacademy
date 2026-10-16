'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';

interface SocialProofProps {
  authorities: { name: string; note: string }[];
  text: string;
}

export default function SocialProof({ authorities, text }: SocialProofProps) {
  return (
    <Section>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">
          Por que confiar nesta metodologia
        </h2>
        <p className="text-lg text-text max-w-2xl text-justify">
          {text}
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

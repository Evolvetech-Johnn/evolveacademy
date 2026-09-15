'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  id?: string;
  title: string;
  subtitle: string;
  items: Benefit[];
}

export default function Benefits({ id = 'beneficios', title, subtitle, items }: BenefitsProps) {
  return (
    <Section id={id}>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">{title}</h2>
        <p className="text-lg text-text max-w-2xl">{subtitle}</p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-6"
      >
        {items.map((benefit, index) => (
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

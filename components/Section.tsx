'use client';

import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../animations/variants';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative ${className}`}
    >
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-accent-primary/30" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUpVariants}
        className="max-w-6xl mx-auto px-8 md:px-12 pl-12 md:pl-20"
      >
        {children}
      </motion.div>
    </section>
  );
}

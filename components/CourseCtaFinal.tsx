'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUpVariants, buttonVariants } from '../animations/variants';

export default function CourseCtaFinal() {
  return (
    <section className="bg-base text-white py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUpVariants}
        className="max-w-3xl mx-auto px-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Você já sabe que marketing no instinto tem teto.
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          A diferença entre continuar tentando e ter um sistema está em 7 módulos.
        </p>
        <motion.div
          className="inline-block"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            href="/login?callbackUrl=%2Fmeus-cursos"
            className="inline-block px-8 py-4 bg-accent-secondary text-base font-semibold rounded-lg hover:bg-accent-secondary/90 transition-colors"
          >
            Garantir meu acesso vitalício
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

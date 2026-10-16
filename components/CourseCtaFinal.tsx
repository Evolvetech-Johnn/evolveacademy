'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../animations/variants';

interface CourseCtaFinalProps {
  course: string;
  title: string;
  text: string;
  freeLessonSlug: string;
}

export default function CourseCtaFinal({ course, title, text, freeLessonSlug }: CourseCtaFinalProps) {
  return (
    <section className="bg-base text-white py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUpVariants}
        className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          {text}
        </p>
        <Link
          href={`/cursos/${course}/aulas/${freeLessonSlug}`}
          className="block w-full sm:w-auto sm:inline-block text-center px-8 py-4 bg-accent-secondary text-base font-semibold rounded-lg hover:bg-accent-secondary/90 active:scale-95 transition-all"
        >
          Começar o curso agora
        </Link>
      </motion.div>
    </section>
  );
}

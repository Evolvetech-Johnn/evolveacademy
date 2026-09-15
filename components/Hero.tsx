'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, buttonVariants } from '../animations/variants';

export default function Hero() {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24 relative">
      <div className="absolute left-4 md:left-8 top-20 bottom-0 w-px bg-accent-primary/30" />
      <div className="max-w-6xl mx-auto px-8 md:px-12 pl-12 md:pl-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-sm font-medium">
              Plataforma de cursos da EvolveTech Solutions
            </span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-base mb-6 leading-tight">
            Aprenda com quem aplica isso todo dia em negócios de verdade.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text mb-8 max-w-2xl">
            Cursos práticos, direto ao ponto, criados pela EvolveTech Solutions para quem quer resultado — não teoria solta.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/cursos/marketing"
                className="px-6 py-3.5 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors"
              >
                Ver curso de Marketing
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <a
                href="#cursos"
                className="px-6 py-3.5 bg-transparent border border-gray-200 text-text font-semibold rounded-lg hover:border-gray-300 transition-colors"
              >
                Ver todos os cursos
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

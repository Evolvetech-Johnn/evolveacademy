'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, buttonVariants } from '../animations/variants';

export default function Header() {
  return (
    <header className="sticky top-0 bg-surface border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-between items-center h-16"
        >
          <motion.div variants={itemVariants} className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-base">
              Evolveacademy
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <Link href="/login" className="text-text hover:text-base font-medium transition-colors">
              Entrar
            </Link>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/login"
                className="px-5 py-2.5 bg-accent-primary text-white font-semibold rounded-lg hover:bg-accent-primary/90 transition-colors"
              >
                Começar
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

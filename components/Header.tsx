'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';

export default function Header() {
  return (
    <header className="sticky top-0 bg-surface border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-between items-center h-16"
        >
          <motion.div variants={itemVariants} className="flex items-center min-w-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-2xl font-bold text-base truncate">
              <Image src="/logo.png" alt="Evolveacademy" width={28} height={28} priority className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
              <span className="truncate">Evolveacademy</span>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            <Link href="/cursos/marketing" className="text-text hover:text-base font-medium transition-colors hidden sm:inline">
              Cursos
            </Link>
            <Link
              href="/cursos/marketing"
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-accent-primary text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-accent-primary/90 active:scale-95 transition-all whitespace-nowrap"
            >
              Começar
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

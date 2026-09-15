'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';

export default function Footer() {
  return (
    <footer className="bg-base text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">Evolveacademy</h4>
            <p className="text-gray-400 max-w-sm text-justify">
              A plataforma de cursos online da EvolveTech Solutions — conhecimento prático para quem
              toca marketing, vendas e crescimento no dia a dia.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h5 className="font-semibold mb-4">Cursos</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/cursos/marketing" className="hover:text-white transition-colors">Marketing do Zero ao Avançado</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h5 className="font-semibold mb-4">Contato</h5>
            <ul className="space-y-2 text-gray-400">
              <li>contato@evolvetechsolutions.com.br</li>
            </ul>
          </motion.div>
        </motion.div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; 2026 Evolveacademy — EvolveTech Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

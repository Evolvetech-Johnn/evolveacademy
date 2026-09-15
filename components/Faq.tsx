'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';

const faqItems = [
  {
    question: 'Eu não tenho nenhuma experiência com marketing. Consigo acompanhar?',
    answer:
      'Sim. O Módulo 1 parte do zero conceitual — o que é marketing, os 4 Ps, segmentação — antes de qualquer aula tática. A sequência dos 7 módulos foi desenhada para quem nunca formalizou o que já faz no instinto.',
  },
  {
    question: 'Isso serve para o meu tipo de negócio, ou é só para e-commerce/SaaS?',
    answer:
      'Os exemplos e contraexemplos cobrem categorias variadas — varejo, serviço local, B2B, infoproduto, franquia. O método se aplica a qualquer PME; os exercícios pedem que você aplique com os dados do seu próprio negócio.',
  },
  {
    question: 'Quanto tempo tenho acesso ao curso?',
    answer:
      'Acesso vitalício. Você estuda no seu ritmo e pode voltar a qualquer módulo sempre que precisar revisar um conceito antes de uma campanha real.',
  },
  {
    question: 'Preciso criar conta ou pagar para acessar?',
    answer:
      'Não. O curso está em fase inicial de testes: todas as aulas estão abertas, sem login e sem custo.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">Perguntas frequentes</h2>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="space-y-4 max-w-3xl"
      >
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={item.question}
              variants={itemVariants}
              className="border border-gray-100 rounded-xl bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <h3 className="font-semibold text-base">{item.question}</h3>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-text flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-6 text-text text-justify">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

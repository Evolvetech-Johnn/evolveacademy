'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';
import type { PlainModule } from '../lib/courses';

const moduleHooks: Record<number, string> = {
  1: 'Antes de escrever um anúncio, entenda por que a maioria deles falha: o problema quase nunca é a campanha, é não ter respondido "que problema real isso resolve, para quem".',
  2: 'Marca não é logo bonito. É o espaço que você ocupa na cabeça do cliente — e aqui você aprende a construir esse espaço de propósito, não por acaso.',
  3: 'As mesmas estruturas usadas por Ogilvy, Cialdini e Donald Miller para transformar atenção em desejo e desejo em ação — sem depender de sorte na hora de escrever.',
  4: 'SEO, conteúdo, e-mail e redes sociais param de ser tarefas soltas e viram um sistema conectado, cada canal fazendo o trabalho que só ele faz bem.',
  5: 'Meta Ads e Google Ads deixam de ser caixa-preta: você entende o leilão, o funil e por que cortar campanha cedo demais é o erro mais caro do tráfego pago.',
  6: 'A diferença entre achismo e decisão: como ler métrica, rodar teste A/B de verdade e otimizar conversão sem precisar de mais tráfego.',
  7: 'IA, GEO e tendências de mercado, filtradas pela pergunta certa — e o fechamento do curso: seu próprio plano de marketing de 90 dias, pronto para executar.',
};

interface ModuleAccordionProps {
  modules: PlainModule[];
}

export default function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="modulos">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">Os 7 módulos do curso</h2>
        <p className="text-lg text-text max-w-2xl">
          42 aulas organizadas numa sequência que vai dos fundamentos ao plano de 90 dias de execução.
        </p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="space-y-4 max-w-3xl"
      >
        {modules.map((mod) => {
          const isOpen = openId === mod._id;
          return (
            <motion.div
              key={mod._id}
              variants={itemVariants}
              className="border border-gray-100 rounded-xl bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : mod._id)}
                className="w-full flex items-center gap-4 p-6 text-left"
              >
                <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-accent-secondary/10 text-accent-secondary font-bold flex items-center justify-center">
                  {mod.order}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-base">{mod.title}</h3>
                  <p className="text-text mt-1">{moduleHooks[mod.order]}</p>
                </div>
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
                    <ul className="px-6 pb-6 pl-20 space-y-2">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson._id}>
                          <Link
                            href={`/cursos/marketing/aulas/${lesson.slug}`}
                            className="text-text hover:text-accent-secondary transition-colors flex items-center gap-2"
                          >
                            {lesson.title}
                            {lesson.isFreePreview && (
                              <span className="text-xs font-semibold text-accent-primary">grátis</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
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

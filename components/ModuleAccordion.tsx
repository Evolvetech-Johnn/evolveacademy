'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '../animations/variants';
import Section from './Section';
import type { PlainModule } from '../lib/courses';

interface ModuleAccordionProps {
  course: string;
  modules: PlainModule[];
  hooks: Record<number, string>;
  subtitle: string;
}

export default function ModuleAccordion({ course, modules, hooks, subtitle }: ModuleAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="modulos">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">Os {modules.length} módulos do curso</h2>
        <p className="text-lg text-text max-w-2xl">
          {subtitle}
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
                className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-6 text-left"
              >
                <span className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg bg-accent-secondary/10 text-accent-secondary text-sm sm:text-base font-bold flex items-center justify-center">
                  {mod.order}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-base">{mod.title}</h3>
                  <p className="text-text text-sm sm:text-base mt-1 hidden sm:block text-justify">{hooks[mod.order]}</p>
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
                    <ul className="px-4 sm:px-6 pb-4 sm:pb-6 pl-6 sm:pl-10 md:pl-20 space-y-3 sm:space-y-2">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson._id}>
                          <Link
                            href={`/cursos/${course}/aulas/${lesson.slug}`}
                            className="text-text hover:text-accent-secondary transition-colors block py-1"
                          >
                            {lesson.title}
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

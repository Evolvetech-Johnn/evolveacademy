'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, buttonVariants, cardVariants } from '../animations/variants';
import Section from './Section';

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Mensal',
    price: 'R$99',
    period: '/mês',
    features: [
      { text: 'Até 50 alunos' },
      { text: 'Gestão de planos' },
      { text: 'Relatórios básicos' },
      { text: 'Suporte por e-mail' },
    ],
  },
  {
    name: 'Trimestral',
    price: 'R$269',
    period: '/3 meses',
    features: [
      { text: 'Até 200 alunos' },
      { text: 'Tudo do plano Mensal' },
      { text: 'Relatórios avançados' },
      { text: 'Suporte por chat' },
    ],
    popular: true,
  },
  {
    name: 'Anual',
    price: 'R$999',
    period: '/ano',
    features: [
      { text: 'Alunos ilimitados' },
      { text: 'Tudo do plano Trimestral' },
      { text: 'API de integração' },
      { text: 'Suporte prioritário' },
    ],
  },
];

export default function Plans() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">
          Escolha seu plano
        </h2>
        <p className="text-lg text-text max-w-2xl mx-auto">
          Preços transparentes, sem taxas escondidas. Cancele quando quiser.
        </p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className={`p-6 rounded-xl border relative ${
              plan.popular
                ? 'border-accent-primary bg-accent-primary/5'
                : 'border-gray-100 bg-surface'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-accent-primary text-white text-xs font-bold rounded-full">
                  Mais escolhido
                </span>
              </div>
            )}
            <h3 className="text-xl font-semibold text-base mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-base">{plan.price}</span>
              <span className="text-text ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-text">
                  <svg className="w-5 h-5 text-accent-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature.text}
                </li>
              ))}
            </ul>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/login"
                className={`block w-full py-3 text-center font-semibold rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-accent-primary text-white hover:bg-accent-primary/90'
                    : 'bg-base text-white hover:bg-base/90'
                }`}
              >
                Escolher plano
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

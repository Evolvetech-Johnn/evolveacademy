'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Plans from '../components/Plans';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Plans />
      </main>
      <Footer />
    </div>
  );
}

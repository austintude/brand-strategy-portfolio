'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  companyName: string;
  creatorName: string;
  activeView: 'built' | 'proposed';
  roleName?: string;
}

export default function Hero({
  companyName,
  creatorName,
  activeView,
  roleName = 'Brand Strategist',
}: HeroProps) {
  return (
    <section className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-6 py-24 relative">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal delay={0.1}>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
            Brand Strategy
            <br />
            <span className="text-[#C2410C]">for {companyName}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-lg md:text-xl text-gray-500 font-sans mb-16">
            <p>
              A strategic perspective from {creatorName} -- {roleName}
            </p>
            {activeView === 'proposed' && (
              <p className="mt-3 text-base text-gray-400">
                Custom strategy proposal
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="w-16 h-0.5 bg-[#C2410C] mx-auto mb-16" />

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

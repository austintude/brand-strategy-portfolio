'use client';

import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IdentitySectionProps {
  activeView: 'built' | 'proposed';
  companyName: string;
  portfolioData?: any;
  companyData?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function IdentitySection({
  activeView,
  companyName,
  portfolioData,
  companyData,
}: IdentitySectionProps) {
  if (activeView === 'built') {
    return (
      <section className="bg-white py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
                Visual Identity
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Logo, color, typography, and design systems
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {portfolioData?.identity?.map((item: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <motion.div
                  className="group overflow-hidden rounded-lg border border-gray-200 hover:border-[#C2410C]/30 transition-colors cursor-pointer bg-[#FAFAF8]"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 font-sans text-sm">
                      Visual Preview
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-[#C2410C] mb-3">
                      {item.client}
                    </p>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {item.challenge}
                    </p>
                    {item.metrics && (
                      <p className="font-sans text-sm text-gray-400 mt-4 pt-4 border-t border-gray-100">
                        {item.metrics}
                      </p>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
            {/* eslint-enable @typescript-eslint/no-explicit-any */}
          </div>
        </div>
      </section>
    );
  }

  // Proposed view
  const identity = companyData?.identity;

  return (
    <section className="bg-white py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
              Visual Identity for {companyName}
            </h2>
            <p className="font-sans text-lg text-gray-500">
              Analysis and strategic recommendations
            </p>
          </div>
        </ScrollReveal>

        {!companyData ? (
          <ScrollReveal>
            <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-12 text-center">
              <p className="font-sans text-lg text-gray-500 mb-4">
                Custom strategy in development -- reach out to discuss.
              </p>
              <p className="font-sans text-gray-400">
                Email: madison@example.com
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-12">
            {/* Audit */}
            {identity?.audit && (
              <ScrollReveal>
                <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-6">
                    Current Identity Audit
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed text-lg">
                    {identity.audit}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {/* Mood Board */}
            {identity?.moodBoard && identity.moodBoard.length > 0 && (
              <ScrollReveal>
                <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Visual Direction
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {identity.moodBoard.map((item: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="border border-gray-200 rounded-lg p-6 bg-white"
                      >
                        <p className="font-sans text-gray-600 leading-relaxed">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Recommendations */}
            {identity?.recommendations && identity.recommendations.length > 0 && (
              <ScrollReveal>
                <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Identity Recommendations
                  </h3>
                  <div className="space-y-6">
                    {identity.recommendations.map(
                      (rec: string, idx: number) => (
                        <div key={idx} className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C2410C] text-white font-semibold font-sans">
                              {idx + 1}
                            </div>
                          </div>
                          <p className="font-sans text-gray-600 leading-relaxed pt-2">
                            {rec}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import ScrollReveal from './ScrollReveal';
import CaseStudyCard from './CaseStudyCard';
import { motion } from 'framer-motion';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MeasurementSectionProps {
  activeView: 'built' | 'proposed';
  companyName: string;
  portfolioData?: any;
  companyData?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function MeasurementSection({
  activeView,
  companyName,
  portfolioData,
  companyData,
}: MeasurementSectionProps) {
  if (activeView === 'built') {
    return (
      <section className="bg-white py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
                Measurement & Analytics
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Data-driven frameworks for tracking brand impact
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {portfolioData?.measurement?.map((study: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <CaseStudyCard {...study} />
              </ScrollReveal>
            ))}
            {/* eslint-enable @typescript-eslint/no-explicit-any */}
          </div>
        </div>
      </section>
    );
  }

  // Proposed view
  const measurement = companyData?.measurement;

  return (
    <section className="bg-white py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
              Measurement Strategy for {companyName}
            </h2>
            <p className="font-sans text-lg text-gray-500">
              Data-driven frameworks for tracking brand impact
            </p>
          </div>
        </ScrollReveal>

        {!measurement ? (
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
            {/* Framework */}
            <ScrollReveal>
              <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                <h3 className="font-serif text-3xl text-gray-900 mb-6">
                  Measurement Framework
                </h3>
                <p className="font-sans text-lg text-gray-600 leading-relaxed">
                  {measurement.framework}
                </p>
              </div>
            </ScrollReveal>

            {/* KPIs Grid */}
            {measurement.kpis && (
              <ScrollReveal>
                <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Key Performance Indicators
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    {measurement.kpis.map((kpi: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                      >
                        <h4 className="font-serif text-xl text-[#C2410C] mb-3">
                          {kpi.metric}
                        </h4>

                        <div className="mb-4 pb-4 border-b border-gray-100">
                          <p className="font-sans text-xs uppercase tracking-wide text-gray-400 mb-1">
                            Target
                          </p>
                          <p className="font-sans font-semibold text-gray-900">
                            {kpi.target}
                          </p>
                        </div>

                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                          {kpi.why}
                        </p>
                      </motion.div>
                    ))}
                    {/* eslint-enable @typescript-eslint/no-explicit-any */}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Tools */}
            {measurement.tools && measurement.tools.length > 0 && (
              <ScrollReveal>
                <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Measurement Tools
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {measurement.tools.map((tool: string, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg p-4 text-center"
                      >
                        <p className="font-sans font-medium text-gray-700 text-sm">
                          {tool}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Dashboard Mockup */}
            <ScrollReveal>
              <div className="bg-[#FAFAF8] border border-gray-200 rounded-lg p-8 md:p-12">
                <h3 className="font-serif text-3xl text-gray-900 mb-8">
                  Dashboard & Reporting
                </h3>

                {/* Wireframe */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-5 w-32 bg-gray-200 rounded" />
                      <div className="flex gap-2">
                        <div className="h-8 w-24 bg-gray-100 rounded" />
                        <div className="h-8 w-24 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-50 border border-gray-100 rounded-lg p-6"
                      >
                        <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
                        <div className="h-6 w-24 bg-gray-100 rounded mb-2" />
                        <div className="h-2 w-20 bg-gray-50 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 h-48 flex items-end justify-around gap-2">
                    {[40, 20, 55, 30, 65, 25, 45].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#C2410C]/20 border-b-4 border-[#C2410C] rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {measurement.dashboardMockup && (
                  <p className="font-sans text-gray-600 leading-relaxed mt-8">
                    {measurement.dashboardMockup}
                  </p>
                )}
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import ScrollReveal from './ScrollReveal';
import CaseStudyCard from './CaseStudyCard';
import { motion } from 'framer-motion';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CampaignsSectionProps {
  activeView: 'built' | 'proposed';
  companyName: string;
  portfolioData?: any;
  companyData?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function CampaignsSection({
  activeView,
  companyName,
  portfolioData,
  companyData,
}: CampaignsSectionProps) {
  if (activeView === 'built') {
    return (
      <section className="bg-[#FAFAF8] py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
                Campaign Strategy
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Breakthrough campaigns that drive awareness and action
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {portfolioData?.campaigns?.map((study: any, idx: number) => (
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
  const campaigns = companyData?.campaigns;

  return (
    <section className="bg-[#FAFAF8] py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
              Campaign Strategy for {companyName}
            </h2>
            <p className="font-sans text-lg text-gray-500">
              Breakthrough campaigns tailored to your brand
            </p>
          </div>
        </ScrollReveal>

        {!campaigns || campaigns.length === 0 ? (
          <ScrollReveal>
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="font-sans text-lg text-gray-500 mb-4">
                Custom strategy in development -- reach out to discuss.
              </p>
              <p className="font-sans text-gray-400">
                Email: madison@example.com
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* eslint-disable @typescript-eslint/no-explicit-any */}
            {campaigns.map((campaign: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <motion.div
                  className="bg-white border border-gray-200 rounded-lg p-8 md:p-10 hover:border-[#C2410C]/30 transition-colors h-full"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="font-serif text-3xl text-gray-900 mb-6">
                    {campaign.concept}
                  </h3>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                      Insight
                    </h4>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {campaign.insight}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                      Creative Territory
                    </h4>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {campaign.territory}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                      Headline
                    </h4>
                    <p className="font-serif text-2xl text-gray-900 font-semibold">
                      {campaign.headline}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                      Channels
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.channels?.map(
                        (channel: string, cidx: number) => (
                          <span
                            key={cidx}
                            className="inline-block bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 font-sans text-sm text-gray-600"
                          >
                            {channel}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                      Expected Impact
                    </h4>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {campaign.impact}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
            {/* eslint-enable @typescript-eslint/no-explicit-any */}
          </div>
        )}
      </div>
    </section>
  );
}

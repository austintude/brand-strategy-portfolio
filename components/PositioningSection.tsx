'use client';

import ScrollReveal from './ScrollReveal';
import CaseStudyCard from './CaseStudyCard';
import CompetitiveMap from './CompetitiveMap';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PositioningSectionProps {
  activeView: 'built' | 'proposed';
  companyName: string;
  portfolioData?: any;
  companyData?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function PositioningSection({
  activeView,
  companyName,
  portfolioData,
  companyData,
}: PositioningSectionProps) {
  if (activeView === 'built') {
    return (
      <section className="bg-[#FAFAF8] py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
                Strategic Positioning
              </h2>
              <p className="font-sans text-lg text-gray-500">
                Defining market position and brand promise
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData?.positioning?.map((study: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <CaseStudyCard {...study} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Proposed view
  const pos = companyData?.positioning;

  return (
    <section className="bg-[#FAFAF8] py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
              Strategic Positioning for {companyName}
            </h2>
            <p className="font-sans text-lg text-gray-500">
              Defining your market position and brand promise
            </p>
          </div>
        </ScrollReveal>

        {!companyData ? (
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
          <div className="space-y-12">
            {/* Brand Positioning Canvas */}
            {pos?.canvas && (
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Brand Positioning Canvas
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                        Target Audience
                      </h4>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {pos.canvas.targetAudience}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                        Category Frame
                      </h4>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {pos.canvas.categoryFrame}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                        Brand Promise
                      </h4>
                      <p className="font-sans text-gray-600 leading-relaxed text-lg">
                        {pos.canvas.brandPromise}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-4">
                        Reasons to Believe
                      </h4>
                      <ul className="space-y-3">
                        {pos.canvas.reasonsToBelieve?.map(
                          (reason: string, idx: number) => (
                            <li
                              key={idx}
                              className="font-sans text-gray-600 flex items-start"
                            >
                              <span className="text-[#C2410C] mr-3 mt-0.5 font-bold">
                                &#10003;
                              </span>
                              {reason}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
                        Competitive Differentiator
                      </h4>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {pos.canvas.competitiveDifferentiator}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Competitive Map */}
            {pos?.competitiveMap && (
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Market Position
                  </h3>
                  <CompetitiveMap
                    mapData={pos.competitiveMap}
                    targetCompany={companyData.company}
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Recommendations */}
            {pos?.recommendations && (
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Strategic Recommendations
                  </h3>

                  <div className="space-y-8">
                    {pos.recommendations.map(
                      (rec: any, idx: number) => (
                        <div key={idx} className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C2410C] text-white font-semibold font-sans">
                              {rec.number || idx + 1}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-sans font-semibold text-gray-900 mb-2">
                              {rec.title}
                            </h4>
                            <p className="font-sans text-gray-600 leading-relaxed">
                              {rec.detail || rec.description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Messaging Hierarchy */}
            {pos?.messagingHierarchy && (
              <ScrollReveal>
                <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
                  <h3 className="font-serif text-3xl text-gray-900 mb-8">
                    Messaging Hierarchy
                  </h3>

                  {/* Brand Promise */}
                  <div className="bg-[#C2410C] text-white rounded-lg p-6 mb-4 text-center">
                    <p className="font-sans text-xs uppercase tracking-wide mb-2 opacity-80">
                      Brand Promise
                    </p>
                    <p className="font-serif text-xl">
                      {pos.messagingHierarchy.brandPromise}
                    </p>
                  </div>

                  {/* Value Props */}
                  <div className="bg-[#C2410C]/10 rounded-lg p-6 mb-4">
                    <p className="font-sans text-xs uppercase tracking-wide mb-3 text-[#C2410C] font-semibold">
                      Value Propositions
                    </p>
                    <ul className="space-y-2">
                      {pos.messagingHierarchy.valuePropositions?.map(
                        (vp: string, idx: number) => (
                          <li
                            key={idx}
                            className="font-sans text-gray-700"
                          >
                            {vp}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Proof Points */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="font-sans text-xs uppercase tracking-wide mb-3 text-gray-500 font-semibold">
                      Proof Points
                    </p>
                    <ul className="space-y-2">
                      {pos.messagingHierarchy.proofPoints?.map(
                        (pp: string, idx: number) => (
                          <li
                            key={idx}
                            className="font-sans text-gray-600 text-sm"
                          >
                            {pp}
                          </li>
                        )
                      )}
                    </ul>
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

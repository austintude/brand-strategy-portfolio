'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyCardProps {
  title: string;
  client: string;
  challenge: string;
  approach?: string;
  outcome?: string;
  metrics?: string | string[];
}

export default function CaseStudyCard({
  title,
  client,
  challenge,
  approach,
  outcome,
  metrics,
}: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const metricsDisplay =
    typeof metrics === 'string'
      ? metrics
      : Array.isArray(metrics)
        ? metrics.join(' | ')
        : null;

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer group h-full"
      whileHover={{ y: -4 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-2xl text-gray-900 mb-2">{title}</h3>
        <p className="font-sans text-sm text-[#C2410C] mb-4">{client}</p>
        <p className="font-sans text-gray-600 mb-4 leading-relaxed">
          {challenge}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 mt-6 pt-6"
            >
              {approach && (
                <div className="mb-6">
                  <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                    Approach
                  </h4>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {approach}
                  </p>
                </div>
              )}

              {outcome && (
                <div className="mb-6">
                  <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                    Outcome
                  </h4>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {outcome}
                  </p>
                </div>
              )}

              {metricsDisplay && (
                <div className="bg-[#FAFAF8] rounded-lg p-4">
                  <h4 className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                    Results
                  </h4>
                  <p className="font-sans text-[#C2410C] font-medium">
                    {metricsDisplay}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-6 flex items-center font-sans text-sm text-gray-400"
          animate={{ opacity: isExpanded ? 1 : 0.6 }}
        >
          <span>{isExpanded ? 'Hide details' : 'View details'}</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="ml-2"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M4 6l4 4 4-4" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

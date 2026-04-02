'use client';

import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  companyName: string;
  creatorName: string;
}

export default function AboutSection({
  companyName,
  creatorName,
}: AboutSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-[#FAFAF8] py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Bio */}
        <ScrollReveal className="mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-8">
            About {creatorName}
          </h2>

          <div className="space-y-6">
            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              {creatorName} is a brand strategist with deep expertise across
              positioning, identity, campaigns, and measurement. With a track
              record of building brands from the ground up and repositioning
              established players, {creatorName} combines strategic rigor with
              creative thinking to solve complex brand challenges.
            </p>

            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              Specializing in discovery, analysis, and recommendation, the work
              encompasses comprehensive brand audits, competitive positioning,
              messaging architecture, visual identity strategy, campaign concept
              development, and measurement frameworks that drive business results.
            </p>

            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              For {companyName}, this means clarity on market position,
              differentiation that resonates, and campaigns that move audiences
              to action.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal className="my-16 border-t border-gray-200 pt-16">
          <h3 className="font-serif text-3xl text-gray-900 mb-8">
            {"Let's Talk"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.a
              href="mailto:madison@example.com"
              className="group"
              whileHover={{ x: 4 }}
            >
              <div className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Email
              </div>
              <div className="font-sans text-lg text-[#C2410C] group-hover:text-[#C2410C]/80 transition-colors">
                madison@example.com
              </div>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ x: 4 }}
            >
              <div className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                LinkedIn
              </div>
              <div className="font-sans text-lg text-[#C2410C] group-hover:text-[#C2410C]/80 transition-colors">
                linkedin.com/in/madison
              </div>
            </motion.a>

            <motion.a href="#" className="group" whileHover={{ x: 4 }}>
              <div className="font-sans font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Portfolio
              </div>
              <div className="font-sans text-lg text-[#C2410C] group-hover:text-[#C2410C]/80 transition-colors">
                View Selected Work
              </div>
            </motion.a>
          </div>

          <motion.a
            href="/resume.pdf"
            download
            className="inline-block px-8 py-4 bg-[#C2410C] text-white font-sans font-semibold rounded-lg hover:bg-[#C2410C]/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
          </motion.a>
        </ScrollReveal>

        {/* Closing */}
        <ScrollReveal className="border-t border-gray-200 pt-16 mt-16">
          <blockquote className="font-serif text-2xl md:text-3xl text-gray-900 italic mb-6">
            {"Strong brands don't happen by accident. They're built on clear thinking, strategic conviction, and relentless attention to detail."}
          </blockquote>
          <p className="font-sans text-gray-500">
            Ready to build something for {companyName}?
          </p>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-200 text-center">
        <p className="font-sans text-sm text-gray-400">
          Built by {creatorName} -- {currentYear}
        </p>
      </div>
    </section>
  );
}

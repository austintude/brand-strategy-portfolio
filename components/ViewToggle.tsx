'use client';

import { motion } from 'framer-motion';

interface ViewToggleProps {
  activeView: 'built' | 'proposed';
  setActiveView: (view: 'built' | 'proposed') => void;
  companyName: string;
}

export default function ViewToggle({
  activeView,
  setActiveView,
  companyName,
}: ViewToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <div className="backdrop-blur-md bg-white/70 border border-gray-200/50 shadow-sm rounded-full px-1 py-1 flex gap-1 pointer-events-auto">
        <motion.button
          onClick={() => setActiveView('built')}
          className="relative px-6 py-3 rounded-full font-sans text-sm font-medium transition-colors"
          animate={{
            backgroundColor: activeView === 'built' ? '#C2410C' : 'transparent',
            color: activeView === 'built' ? '#FFFFFF' : '#1a1a1a',
          }}
        >
          {"What I've Built"}
        </motion.button>

        <motion.button
          onClick={() => setActiveView('proposed')}
          className="relative px-6 py-3 rounded-full font-sans text-sm font-medium transition-colors"
          animate={{
            backgroundColor:
              activeView === 'proposed' ? '#C2410C' : 'transparent',
            color: activeView === 'proposed' ? '#FFFFFF' : '#1a1a1a',
          }}
        >
          {"What I'd Build for "}{companyName}
        </motion.button>
      </div>
    </motion.div>
  );
}

'use client';

import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

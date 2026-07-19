import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  /** Slightly stronger cinematic entrance */
  intense?: boolean;
};

/**
 * Full-section scroll reveal — fade + rise + soft scale (cinematic).
 */
export function ScrollSection({ children, className = '', intense = false }: ScrollSectionProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: intense ? 56 : 40, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -8% 0px' }}
      transition={{ duration: intense ? 0.85 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Positive = moves slower / opposite feel; typical 0.15–0.45 */
  speed?: number;
};

/**
 * Background layer that drifts at a different rate than scroll (parallax).
 */
export function ParallaxLayer({ children, className = '', speed = 0.28 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}

type ParallaxYProps = {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
};

/** Apply y parallax to foreground content (e.g. hero phone). */
export function ParallaxY({ children, className = '', from = 40, to = -40 }: ParallaxYProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, to]);

  return (
    <motion.div ref={ref} style={{ y }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}

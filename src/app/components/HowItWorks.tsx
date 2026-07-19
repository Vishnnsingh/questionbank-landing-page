import { BarChart, BookOpen, Download, Languages, Trophy, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Download the App',
    description: 'Get the Honhaar app from Google Play Store for free',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Signup & Signin',
    description: 'Create your account with email or mobile number and start your journey',
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Start Solving Questions',
    description: 'Access 10 years of questions and start practicing with detailed solutions',
  },
  {
    number: '04',
    icon: Languages,
    title: 'Choose Your Language',
    description: 'Practice in your preferred language - Hindi, English, or Hinglish',
  },
  {
    number: '05',
    icon: BarChart,
    title: 'Analyze Performance',
    description: 'Track your progress with detailed analytics and identify weak areas',
  },
  {
    number: '06',
    icon: Trophy,
    title: 'See Overall Rank',
    description: 'Compare your performance with thousands of students across Bihar',
  },
];

function SketchArrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={`mx-auto hidden h-10 w-28 text-teal-600/70 md:block ${flip ? 'rotate-180' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 24c18-14 36 14 54 0s36-14 50 2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="5 7"
        className="opacity-80"
      />
      <path
        d="M98 18l14 8-16 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SketchConnectorVertical() {
  return (
    <div className="flex justify-center py-1 md:hidden" aria-hidden="true">
      <svg viewBox="0 0 24 56" className="h-12 w-6 text-teal-600/70" fill="none">
        <path
          d="M12 4c-4 10 4 12 0 22s4 12 0 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        <path d="M7 44l5 8 5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-14 sm:py-20 lg:py-32"
    >
      {/* Soft paper grain / doodle backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sketch-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#0d9488" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sketch-dots)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-[1.2rem] border-2 border-dashed border-white/50 bg-gradient-to-r from-teal-600 to-blue-600 px-5 py-2.5 text-sm text-white shadow-lg shadow-teal-700/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>Simple & Easy Process</span>
          </div>
          <h2 className="mb-5 text-3xl tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            How It
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {' '}
              Works
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-xl">Get started in 6 simple steps</p>
        </div>

        {/* Sketch journey — alternating sticky-note cards */}
        <div className="relative mx-auto max-w-5xl">
          {/* Desktop wavy spine */}
          <svg
            className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-24 -translate-x-1/2 text-teal-500/40 lg:block"
            viewBox="0 0 96 900"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M48 0c-18 60 18 90 0 150s18 90 0 150 18 90 0 150 18 90 0 150 18 90 0 150"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />
          </svg>

          <ol className="relative space-y-2 md:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const tilt = isLeft ? '-rotate-[1.4deg]' : 'rotate-[1.4deg]';
              const hoverTilt = isLeft ? 'hover:rotate-0' : 'hover:rotate-0';

              return (
                <li key={step.number} className="relative">
                  <motion.div
                    className={`relative grid items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6 ${
                      index > 0 ? 'md:mt-10' : ''
                    }`}
                    initial={{ opacity: 0, y: 36, rotate: isLeft ? -3 : 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                  >
                    {/* Left slot */}
                    <div className={`hidden md:block ${isLeft ? '' : 'invisible'}`}>
                      {isLeft ? (
                        <StepSketchCard step={step} index={index} className={`${tilt} ${hoverTilt} ml-auto max-w-md`} />
                      ) : null}
                    </div>

                    {/* Center marker */}
                    <div className="relative z-10 mx-auto flex flex-col items-center">
                      <div className="relative flex size-14 items-center justify-center sm:size-16">
                        <svg viewBox="0 0 64 64" className="absolute inset-0 size-full" aria-hidden="true">
                          <defs>
                            <linearGradient id={`how-step-fill-${index}`} x1="0" y1="0" x2="64" y2="64">
                              <stop stopColor="#0d9488" />
                              <stop offset="1" stopColor="#2563eb" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="white"
                            stroke="#0d9488"
                            strokeWidth="2.4"
                            strokeDasharray="6 5"
                            className="drop-shadow-md"
                          />
                          <circle cx="32" cy="32" r="22" fill={`url(#how-step-fill-${index})`} opacity="0.95" />
                        </svg>
                        <span className="relative text-sm font-bold text-white sm:text-base">{step.number}</span>
                      </div>
                      {index < steps.length - 1 ? <SketchConnectorVertical /> : null}
                    </div>

                    {/* Right slot */}
                    <div className={`hidden md:block ${!isLeft ? '' : 'invisible'}`}>
                      {!isLeft ? (
                        <StepSketchCard step={step} index={index} className={`${tilt} ${hoverTilt} mr-auto max-w-md`} />
                      ) : null}
                    </div>

                    {/* Mobile card */}
                    <div className="md:hidden">
                      <StepSketchCard step={step} index={index} className={`${tilt} mx-auto max-w-lg`} />
                    </div>
                  </motion.div>

                  {/* Desktop sketch arrows between steps */}
                  {index < steps.length - 1 ? (
                    <div className="pointer-events-none absolute left-1/2 top-full z-0 hidden -translate-x-1/2 md:block lg:hidden">
                      <SketchArrow flip={index % 2 === 1} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 text-center sm:mt-16">
          <a
            href="/signup"
            className="inline-flex w-full items-center justify-center gap-3 rounded-[1.25rem] border-2 border-dashed border-white/40 bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl sm:w-auto sm:px-8 sm:text-lg"
          >
            <Download className="size-6" />
            Download Now &amp; Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

function StepSketchCard({
  step,
  index,
  className = '',
}: {
  step: (typeof steps)[number];
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative bg-white p-5 shadow-[6px_8px_0_0_rgba(13,148,136,0.12)] transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${className}`}
      style={{
        borderRadius: index % 2 === 0 ? '1.4rem 0.7rem 1.5rem 0.85rem' : '0.75rem 1.45rem 0.9rem 1.35rem',
      }}
    >
      {/* Hand-drawn border */}
      <div
        className="pointer-events-none absolute inset-1 rounded-[inherit] border-2 border-dashed border-slate-800/55"
        aria-hidden="true"
      />

      {/* Corner doodle */}
      <svg
        className="pointer-events-none absolute right-3 top-3 size-8 text-teal-500/50 opacity-0 transition-opacity group-hover:opacity-100"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M6 22c6-10 14-12 20-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 10l4 2-2 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 text-teal-700 shadow-inner"
          style={{ borderRadius: '1.1rem 0.55rem 1rem 0.7rem', boxShadow: 'inset 0 0 0 2px rgba(13,148,136,0.35)' }}
        >
          <step.icon className="size-7 stroke-[1.75]" />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">Step {step.number}</p>
          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

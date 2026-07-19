import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Priya Sharma',
    class: 'Class 12th Student',
    rating: 5,
    text: 'The AI prediction feature is amazing! It helped me focus on the most important topics and I scored 92% in my exams.',
    location: 'Patna, Bihar',
    variant: 'scroll' as const,
    seal: 'PS',
  },
  {
    name: 'Rahul Kumar',
    class: 'Class 10th Student',
    rating: 5,
    text: 'Mock tests are exactly like the real exams. The performance tracking helped me improve my weak subjects significantly.',
    location: 'Muzaffarpur, Bihar',
    variant: 'decree' as const,
    seal: 'RK',
  },
  {
    name: 'Anjali Singh',
    class: 'Class 12th Student',
    rating: 5,
    text: '10 years question bank with solutions is a game changer. I could practice so many questions and understand the pattern.',
    location: 'Gaya, Bihar',
    variant: 'parchment' as const,
    seal: 'AS',
  },
  {
    name: 'Amit Raj',
    class: 'Class 10th Student',
    rating: 5,
    text: 'The repeated questions feature saved me so much time. I focused only on what matters most and improved my score by 15%.',
    location: 'Bhagalpur, Bihar',
    variant: 'royal' as const,
    seal: 'AR',
  },
];

function GoldStars({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="size-4 fill-amber-400 text-amber-500 drop-shadow-sm sm:size-[1.1rem]" />
      ))}
    </div>
  );
}

function OrnamentLine({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-600/50" />
      <svg viewBox="0 0 24 12" className="h-3 w-6 text-amber-600/80">
        <path d="M2 6h6l4-4 4 4h6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="6" r="1.6" fill="currentColor" />
      </svg>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-600/50" />
    </div>
  );
}

function WaxSeal({ initials, tone }: { initials: string; tone: string }) {
  return (
    <div
      className={`relative mx-auto flex size-12 items-center justify-center rounded-full text-[11px] font-bold tracking-wider text-amber-50 shadow-lg ${tone}`}
      style={{
        boxShadow: '0 4px 0 rgba(120,53,15,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}
    >
      <span className="absolute inset-1 rounded-full border border-amber-200/40" />
      {initials}
    </div>
  );
}

function ScrollRods() {
  return (
    <>
      <div
        className="absolute -top-2 left-3 right-3 h-4 rounded-full bg-gradient-to-b from-amber-700 via-amber-500 to-amber-800 shadow-md"
        aria-hidden="true"
      >
        <div className="absolute inset-x-4 top-1 h-1 rounded-full bg-amber-200/40" />
      </div>
      <div
        className="absolute -bottom-2 left-3 right-3 h-4 rounded-full bg-gradient-to-b from-amber-700 via-amber-500 to-amber-800 shadow-md"
        aria-hidden="true"
      >
        <div className="absolute inset-x-4 top-1 h-1 rounded-full bg-amber-200/40" />
      </div>
    </>
  );
}

function CornerFlourishes({ color = 'text-teal-700/40' }: { color?: string }) {
  return (
    <>
      <svg className={`absolute left-2 top-2 size-8 ${color}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 28V12c0-6 4-10 10-10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28V16c0-4 2-6 6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className={`absolute right-2 top-2 size-8 rotate-90 ${color}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 28V12c0-6 4-10 10-10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28V16c0-4 2-6 6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className={`absolute bottom-2 left-2 size-8 -rotate-90 ${color}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 28V12c0-6 4-10 10-10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28V16c0-4 2-6 6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className={`absolute bottom-2 right-2 size-8 rotate-180 ${color}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 28V12c0-6 4-10 10-10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28V16c0-4 2-6 6-6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </>
  );
}

function LetterBody({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <>
      <GoldStars count={testimonial.rating} />
      <OrnamentLine className="my-3" />
      <p className="text-center text-[13px] leading-relaxed text-slate-700 sm:text-sm">
        <span className="mr-1 text-lg leading-none text-teal-700/70">“</span>
        {testimonial.text}
        <span className="ml-0.5 text-lg leading-none text-teal-700/70">”</span>
      </p>
      <OrnamentLine className="my-4" />
      <div className="text-center">
        <p className="text-base font-semibold tracking-wide text-slate-900">{testimonial.name}</p>
        <p className="mt-1 text-xs font-medium text-blue-700">{testimonial.class}</p>
        <p className="mt-1 text-xs italic text-teal-700">{testimonial.location}</p>
      </div>
    </>
  );
}

function RoyalLetterCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const baseMotion = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' as const },
    transition: { duration: 0.5, delay: index * 0.08 },
  };

  if (testimonial.variant === 'scroll') {
    return (
      <motion.article {...baseMotion} className="relative pt-3 pb-3">
        <ScrollRods />
        <div
          className="relative mx-1 overflow-hidden px-4 py-7 sm:px-5"
          style={{
            background:
              'linear-gradient(180deg, #f8f1e3 0%, #f3e7d3 45%, #efe0c8 100%)',
            boxShadow: 'inset 0 0 40px rgba(180,140,80,0.12), 0 12px 30px -18px rgba(15,23,42,0.35)',
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-amber-900/10 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-amber-900/10 to-transparent" />
          <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-amber-800/80">
            Royal Scroll
          </p>
          <LetterBody testimonial={testimonial} />
          <div className="mt-4">
            <WaxSeal initials={testimonial.seal} tone="bg-gradient-to-br from-red-700 to-rose-900" />
          </div>
        </div>
      </motion.article>
    );
  }

  if (testimonial.variant === 'decree') {
    return (
      <motion.article {...baseMotion} className="relative">
        <div className="absolute -inset-[3px] rounded-[1.4rem] bg-gradient-to-br from-amber-500 via-teal-600 to-blue-700 opacity-90" />
        <div
          className="relative rounded-[1.25rem] border border-amber-700/30 px-4 py-6 sm:px-5"
          style={{
            background:
              'radial-gradient(circle at top, #fff8eb 0%, #f6e8d0 55%, #edd9b8 100%)',
          }}
        >
          <CornerFlourishes color="text-blue-800/35" />
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-amber-700/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-900/70">Royal Decree</span>
            <span className="h-px w-6 bg-amber-700/40" />
          </div>
          <LetterBody testimonial={testimonial} />
          <div className="mt-4">
            <WaxSeal initials={testimonial.seal} tone="bg-gradient-to-br from-blue-700 to-teal-800" />
          </div>
        </div>
      </motion.article>
    );
  }

  if (testimonial.variant === 'parchment') {
    return (
      <motion.article {...baseMotion} className="relative">
        <div
          className="relative border-2 border-dashed border-teal-800/35 px-4 py-6 shadow-[8px_10px_0_0_rgba(13,148,136,0.12)] sm:px-5"
          style={{
            borderRadius: '1.6rem 0.7rem 1.5rem 0.85rem',
            background: 'linear-gradient(145deg, #faf6ee, #f0e4d0 50%, #e8d7bc)',
          }}
        >
          <svg className="pointer-events-none absolute inset-2 text-teal-800/15" aria-hidden="true">
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" rx="14" />
          </svg>
          <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-teal-800/75">
            Handwritten Letter
          </p>
          <LetterBody testimonial={testimonial} />
          <div className="mt-4 flex justify-end pr-2">
            <div className="rotate-[-8deg] border-b-2 border-teal-800/40 pb-0.5 text-right">
              <p className="text-sm italic text-slate-800">{testimonial.name}</p>
            </div>
          </div>
          <div className="mt-3">
            <WaxSeal initials={testimonial.seal} tone="bg-gradient-to-br from-teal-700 to-cyan-900" />
          </div>
        </div>
      </motion.article>
    );
  }

  // royal crest letter
  return (
    <motion.article {...baseMotion} className="relative pt-5">
      <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1 items-center justify-center">
        <div className="flex size-11 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-blue-600 to-teal-600 text-[10px] font-bold tracking-widest text-white shadow-lg">
          H
        </div>
      </div>
      <div
        className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-xl border border-amber-600/25 px-4 pb-6 pt-8 sm:px-5"
        style={{
          background:
            'linear-gradient(180deg, #fff9ef 0%, #f4e6cf 40%, #ebdab8 100%)',
          boxShadow: '0 16px 40px -24px rgba(15,23,42,0.4)',
        }}
      >
        <CornerFlourishes color="text-amber-700/35" />
        <div className="mb-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800/80">Palace Letter</p>
          <div className="mx-auto mt-2 h-px w-16 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
        </div>
        <LetterBody testimonial={testimonial} />
        <div className="mt-4">
          <WaxSeal initials={testimonial.seal} tone="bg-gradient-to-br from-amber-600 to-yellow-800" />
        </div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-14 sm:py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800 shadow-sm">
            Royal letters of praise
          </div>
          <h2 className="mb-4 text-3xl tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What Students Say
          </h2>
          <p className="text-lg text-slate-600">Join thousands of successful Bihar Board students</p>
        </div>

        <div className="grid gap-8 sm:gap-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <RoyalLetterCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:mt-16 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
              2,450+
            </div>
            <div className="text-slate-600">Active Students</div>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
              20,000+
            </div>
            <div className="text-slate-600">Questions Solved</div>
          </div>
          <div className="text-center">
            <div className="mb-2 bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
              92%
            </div>
            <div className="text-slate-600">Average Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}

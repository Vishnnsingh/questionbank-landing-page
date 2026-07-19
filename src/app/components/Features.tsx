import { Award, BookOpen, Brain, Briefcase, FileText, Globe, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
import imageOne from '../../images/im1.jpg';
import imageTwo from '../../images/im2.jpg';
import imageThree from '../../images/im3.jpg';
import { ParallaxLayer } from './scroll-fx';

const features = [
  {
    icon: BookOpen,
    title: '10 Years Question Bank',
    description: 'Access previous year questions with detailed solutions.',
    span: 'lg:col-span-2 lg:row-span-2',
    size: 'large' as const,
  },
  {
    icon: Brain,
    title: 'AI Exam Prediction',
    description: 'Smart algorithm predicts important questions.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
  {
    icon: TrendingUp,
    title: 'Most Repeated Questions',
    description: 'Find questions that appear frequently in exams.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
  {
    icon: Award,
    title: 'Mock Tests',
    description: 'Practice real exam pattern tests.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
  {
    icon: Globe,
    title: 'Chapter & Topic Insights',
    description: 'See which topics are most important.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
  {
    icon: Users,
    title: 'Performance Tracking',
    description: 'Track weak and strong subjects.',
    span: 'lg:col-span-2',
    size: 'wide' as const,
  },
  {
    icon: FileText,
    title: 'Complete Syllabus Coverage',
    description: 'Full Bihar Board syllabus with detailed explanations.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
  {
    icon: Briefcase,
    title: 'Career Assistant',
    description: 'Get guidance for college selection and career planning.',
    span: 'lg:col-span-1',
    size: 'normal' as const,
  },
];

const accentFor = (index: number) => {
  const accents = [
    { badge: 'from-blue-600 to-teal-500', soft: 'from-blue-50 to-teal-50', ring: 'ring-blue-200/80', glow: 'bg-blue-400/20' },
    { badge: 'from-teal-600 to-cyan-500', soft: 'from-teal-50 to-cyan-50', ring: 'ring-teal-200/80', glow: 'bg-teal-400/20' },
    { badge: 'from-cyan-600 to-blue-500', soft: 'from-cyan-50 to-blue-50', ring: 'ring-cyan-200/80', glow: 'bg-cyan-400/20' },
    { badge: 'from-blue-500 to-teal-600', soft: 'from-blue-50 to-slate-50', ring: 'ring-blue-200/80', glow: 'bg-blue-300/20' },
  ];
  return accents[index % accents.length];
};

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/80 to-teal-50 py-14 sm:py-20 lg:py-32"
    >
      <ParallaxLayer speed={0.25} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-5 py-2.5 text-sm text-white shadow-lg shadow-teal-600/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>All-in-One Learning Platform</span>
          </div>
          <h2 className="mb-6 text-3xl tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-teal-600 bg-clip-text text-transparent">
              Smart Preparation
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
            Everything you need to excel in CBSE and Bihar Board exams
          </p>
        </div>

        {/* Unique 8-step journey ribbon (desktop) + stack (mobile) */}
        <div className="mb-8 flex items-center justify-center gap-2 sm:mb-10">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-teal-400/60" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">8-step prep system</p>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-blue-400/60" />
        </div>

        <div className="relative">
          {/* Desktop floating step rail */}
          <div className="mb-8 hidden items-center justify-between gap-1 lg:flex" aria-hidden="true">
            {features.map((_, index) => (
              <div key={index} className="flex flex-1 items-center">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-md ${accentFor(index).badge}`}
                >
                  {index + 1}
                </div>
                {index < features.length - 1 ? (
                  <div className="mx-1 h-0.5 flex-1 rounded-full bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 opacity-70" />
                ) : null}
              </div>
            ))}
          </div>

          {/* Bento mosaic — asymmetric, not a plain timeline */}
          <div className="grid auto-rows-[minmax(140px,auto)] gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-3">
            {features.map((feature, index) => {
              const accent = accentFor(index);
              const isLarge = feature.size === 'large';
              const isWide = feature.size === 'wide';

              return (
                <motion.article
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] ring-1 ${accent.ring} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(13,148,136,0.35)] ${feature.span}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.soft} opacity-70`} />
                  <div className={`absolute -right-10 -top-10 size-36 rounded-full ${accent.glow} blur-2xl transition-opacity group-hover:opacity-100`} />

                  <div
                    className={`relative flex h-full flex-col ${
                      isLarge ? 'justify-between p-6 sm:p-8' : isWide ? 'justify-center p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6' : 'justify-between p-5 sm:p-6'
                    }`}
                  >
                    <div className={`flex items-start justify-between gap-3 ${isWide ? 'sm:contents' : ''}`}>
                      <div
                        className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${accent.badge} ${
                          isLarge ? 'size-14' : 'size-11'
                        }`}
                      >
                        <feature.icon className={isLarge ? 'size-7' : 'size-5'} />
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[11px] font-bold tabular-nums text-slate-700 shadow-sm ${
                          isWide ? 'sm:order-3 sm:ml-auto' : ''
                        }`}
                      >
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className={`mt-4 ${isWide ? 'sm:mt-0 sm:flex-1' : ''} ${isLarge ? 'mt-8' : ''}`}>
                      <h3
                        className={`font-semibold tracking-tight text-slate-950 ${
                          isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`mt-2 leading-relaxed text-slate-600 ${
                          isLarge ? 'max-w-md text-base sm:text-lg' : 'text-sm'
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {isLarge ? (
                      <div className="mt-8 hidden items-center gap-2 text-sm font-medium text-teal-700 sm:flex">
                        <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-teal-500" />
                        Start your board prep here
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:mt-20 sm:grid-cols-3">
          <div className="group cursor-pointer text-center">
            <div className="mb-3 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-4xl text-transparent transition-transform group-hover:scale-110 sm:text-5xl lg:text-6xl">
              20K+
            </div>
            <div className="text-base text-slate-600">Practice Questions</div>
          </div>
          <div className="group cursor-pointer text-center">
            <div className="mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-4xl text-transparent transition-transform group-hover:scale-110 sm:text-5xl lg:text-6xl">
              2.5K+
            </div>
            <div className="text-base text-slate-600">Active Students</div>
          </div>
          <div className="group cursor-pointer text-center">
            <div className="mb-3 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-4xl text-transparent transition-transform group-hover:scale-110 sm:text-5xl lg:text-6xl">
              95%
            </div>
            <div className="text-base text-slate-600">Success Rate</div>
          </div>
        </div>

        {/* Student Images Gallery */}
        <div className="mt-24">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl text-slate-900 lg:text-4xl">
              Join Thousands of{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Smart Learners
              </span>
            </h3>
            <p className="text-lg text-slate-600">
              Students studying smarter with mobile learning and traditional notes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img
                src={imageOne}
                alt="Student studying with mobile phone and notes"
                className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-[340px] lg:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-1 text-xl font-semibold">Digital Learning</div>
                <div className="text-sm text-slate-200">Study anytime, anywhere</div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={imageTwo}
                alt="Young student learning with smartphone and books"
                className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-[340px] lg:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-1 text-xl font-semibold">Smart Preparation</div>
                <div className="text-sm text-slate-200">Books + Technology</div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src={imageThree}
                alt="College student with phone and notebook studying"
                className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-[340px] lg:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-1 text-xl font-semibold">Track Progress</div>
                <div className="text-sm text-slate-200">Monitor your growth</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

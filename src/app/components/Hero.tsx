import { ArrowRight, CheckCircle2, Clock, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import analysisImage from '../../images/analysis.jpg';
import featuresImage from '../../images/features.jpg';
import homeImage from '../../images/home.jpg';
import mockImage from '../../images/moc.jpg';
import objectivesImage from '../../images/objectives.jpg';
import resultsImage from '../../images/results.jpg';
import subjectivesImage from '../../images/subjectives.jpg';
import submitTestImage from '../../images/submittest.jpg';
import testImage from '../../images/test.jpg';

const appScreens = [
  { src: homeImage, alt: 'Honhaar home dashboard with daily streak and subjects' },
  { src: featuresImage, alt: 'Honhaar quick actions and question bank features' },
  { src: analysisImage, alt: 'Honhaar chapter analysis and important questions' },
  { src: mockImage, alt: 'Honhaar global mock tests screen' },
  { src: testImage, alt: 'Honhaar test question screen' },
  { src: objectivesImage, alt: 'Honhaar objective question practice screen' },
  { src: subjectivesImage, alt: 'Honhaar subjective answer practice screen' },
  { src: resultsImage, alt: 'Honhaar mock test results screen' },
  { src: submitTestImage, alt: 'Honhaar submit test confirmation screen' },
];

const carouselScreens = [...appScreens, ...appScreens];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <motion.div
            className="min-w-0 space-y-5 text-center lg:text-left"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="space-y-3">
              <motion.h1
                className="text-3xl tracking-tight sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Honhaar
              </motion.h1>
              <motion.p
                className="text-base text-teal-50 sm:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                CBSE & Bihar Board Question Bank App
              </motion.p>
            </div>

            <motion.p
              className="mx-auto max-w-xl text-sm leading-relaxed text-white/90 sm:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice 20,000+ previous year questions with smart analysis,
              repeated question insights, mock tests, and progress tracking.
            </motion.p>

            <motion.div
              className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/25 bg-white text-slate-950 shadow-2xl shadow-slate-950/20 lg:mx-0"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
            >
              <div className="bg-slate-950 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-teal-200 sm:px-4 sm:text-left sm:text-xs sm:tracking-[0.14em]">
                Limited time launch offer
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                  <div className="min-w-0 text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800">
                      <Sparkles className="size-4" />
                      Full access trial
                    </div>
                    <h2 className="mt-3 text-xl font-bold leading-tight text-slate-950 sm:text-3xl">
                      Try everything for 2 days
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      Question banks, mock tests, analysis, and repeated-question
                      insights for just Rs 2.
                    </p>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-900/20 sm:h-20 sm:w-20">
                    <span className="text-[10px] font-bold uppercase sm:text-xs">Just</span>
                    <span className="text-xl font-black sm:text-3xl">Rs 2</span>
                  </div>
                </div>

                <div className="grid gap-2 text-left text-sm text-slate-700 sm:grid-cols-2">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                    <CheckCircle2 className="size-4 shrink-0 text-teal-600" />
                    All features unlocked
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                    <Clock className="size-4 shrink-0 text-teal-600" />
                    Valid for 2 days
                  </span>
                </div>

                <a
                  href="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition-all hover:-translate-y-0.5 hover:bg-teal-700 sm:px-6 sm:text-base"
                >
                  Register Now
                  <ArrowRight className="size-5 shrink-0" />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mx-0"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              {[
                'Track Yourself in Single App',
                'Do Better & Excel',
                'Update Yourself Daily',
                'Crack Your Goals',
              ].map((text, index) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.65 + index * 0.08 }}
                >
                  <CheckCircle2 className="size-5 shrink-0 text-teal-200" />
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto">
                <svg className="size-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.55.318.55 1.119 0 1.437l-2.807 1.626-2.302-2.302 2.302-2.387zm-3.199-3.198l2.302 2.302-8.635 8.635 10.937-6.333-2.302-2.302z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-teal-50">GET IT ON</div>
                  <div className="-mt-0.5 text-lg">Google Play</div>
                </div>
              </button>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto">
                <Play className="size-5 shrink-0" />
                <span>View Demo</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex min-w-0 justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-full min-w-0 max-w-[640px]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/10 p-3 shadow-2xl shadow-slate-950/20 backdrop-blur-sm sm:rounded-[2rem] sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3 px-1 text-left">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-100 sm:text-xs">
                      App preview
                    </p>
                    <h2 className="text-lg font-bold text-white sm:text-2xl">
                      Learn, test, analyse
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700">
                    Ggallery
                  </span>
                </div>

                <div className="hero-phone-carousel">
                  <div className="hero-phone-track">
                    {carouselScreens.map((screen, index) => (
                      <div key={`${screen.alt}-${index}`} className="hero-phone-frame">
                        <img src={screen.src} alt={screen.alt} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:gap-3">
                {[
                  ['20K+', 'Questions'],
                  ['2 Days', 'Full access'],
                  ['Rs 2', 'Trial price'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/20 bg-white/15 px-2 py-3 backdrop-blur-sm sm:px-3">
                    <div className="text-base font-black text-white sm:text-2xl">{value}</div>
                    <div className="text-[10px] font-semibold text-teal-50 sm:text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

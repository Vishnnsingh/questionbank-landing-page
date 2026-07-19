import { ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import homeImage from '../../images/home.jpg';
import mockImage from '../../images/moc.jpg';
import resultsImage from '../../images/results.jpg';
import testImage from '../../images/test.jpg';
import { ParallaxLayer, ParallaxY } from './scroll-fx';

const carouselScreens = [
  { src: homeImage, alt: 'Prepmagic home dashboard with daily streak and subjects' },
  { src: mockImage, alt: 'Prepmagic global mock tests screen' },
  { src: testImage, alt: 'Prepmagic test question screen' },
  { src: resultsImage, alt: 'Prepmagic mock test results screen' },
];

function HeroPhoneCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className='hero-phone-showcase'>
      <div className='hero-phone-device'>
        <div className='hero-phone-screen' ref={emblaRef}>
          <div className='flex'>
            {carouselScreens.map((screen) => (
              <div key={screen.alt} className='min-w-0 shrink-0 grow-0 basis-full'>
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className='h-full w-full object-cover object-top'
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='hero-phone-dots' role='tablist' aria-label='App preview slides'>
        {carouselScreens.map((screen, index) => (
          <button
            key={screen.alt}
            type='button'
            role='tab'
            aria-label={`Show slide ${index + 1}`}
            aria-selected={selectedIndex === index}
            onClick={() => scrollTo(index)}
            className={`hero-phone-dot ${selectedIndex === index ? 'hero-phone-dot-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 text-white">
      <ParallaxLayer speed={0.18} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-12 lg:px-8 lg:pt-12 lg:pb-16">
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
                Prepmagic
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
              className="mx-auto w-full max-w-xl space-y-5 text-left lg:mx-0"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-100 sm:text-xs">
                    <Sparkles className="size-3.5 text-teal-200" />
                    Limited time launch offer
                  </span>
                  <span className="text-xs font-medium text-white/90">Full access trial</span>
                </div>

                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Try everything for 2 days at{' '}
                  <span className="text-teal-100">Rs 2</span>
                </h2>

                <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                  Question banks, mock tests, analysis, and repeated-question insights.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-teal-200" />
                  All features unlocked
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 shrink-0 text-teal-200" />
                  Valid for 2 days
                </span>
              </div>

              <a
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[220px] sm:text-base"
                style={{ backgroundColor: '#0A121D' }}
              >
                Register Now
                <ArrowRight className="size-5 shrink-0" />
              </a>

              <div className="flex flex-wrap gap-6 sm:gap-8">
                {[
                  ['20K+', 'Questions'],
                  ['2 Days', 'Full access'],
                  ['Rs 2', 'Trial price'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-xl font-black text-white sm:text-2xl">{value}</div>
                    <div className="text-[11px] font-semibold text-teal-50 sm:text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex min-w-0 justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ParallaxY from={36} to={-36} className="w-full min-w-0 max-w-[640px]">
              <HeroPhoneCarousel />
            </ParallaxY>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


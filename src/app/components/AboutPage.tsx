import { Sparkles, Target, Eye } from 'lucide-react';
import { motion } from 'motion/react';

import aboutDesk from '../../images/about-study-desk.jpg';
import aboutProgress from '../../images/about-progress-phone.jpg';
import aboutCoaching from '../../images/about-coaching-group.jpg';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

/** Home brand tokens */
const F = {
  heroGray: '#F0F0F0',
  gradient:
    'linear-gradient(97.77deg, rgba(20, 184, 166, 0.5) 0%, rgba(208, 247, 234, 0.5) 97.73%)',
  cta: '#0F8F84',
  heading: '#1B2A4A',
  body: '#444444',
  label: '#A63426',
  cardBorder: '#C3C6D1',
} as const;

const ABOUT_PARAS = [
  'PrepMagic is an AI-powered educational platform designed to provide Class 9 to 12 students with comprehensive 10-year question banks, mock tests, and smart analytics for exam preparation.',
  'By combining historical board data with personalized insights, PrepMagic enables students from CBSE and Bihar Board to practice effectively and track their performance chapter by chapter.',
  'Beyond individual exam preparation, PrepMagic connects students directly with their schools and coaching institutes, enabling access to exclusive mock tests and verified academic resources from top educators.',
  'Our primary goal is to build India\'s most trusted digital learning ecosystem, ensuring every student has the tools and data-driven guidance necessary to achieve academic success.',
] as const;

const MISSION =
  'To make quality education accessible through technology by providing students with smart learning tools, comprehensive study resources, and data-driven performance insights that improve academic success.';

const VISION =
  "To become India's most trusted AI-powered learning platform, empowering millions of students with innovative educational technology and personalized learning experiences.";

const SHORT_BLURB =
  'PrepMagic is an AI-powered learning platform that helps students prepare smarter with a 10-year question bank, mock tests, performance analytics, and personalized learning insights. Our mission is to make quality education accessible, affordable, and technology-driven for every student.';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO page="about" />
      <SideNav />

      {/* Hero — keep (home mint + CTAs) */}
      <section
        className="relative overflow-hidden"
        style={{ background: F.heroGray }}
      >
        <div className="absolute inset-0" style={{ background: F.gradient }} />
        <img
          src="/image/hero-bg-main.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
          <motion.div
            className="space-y-5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: F.label,
              }}
            >
              About Prepmagic
            </p>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: F.heading,
              }}
            >
              Prepmagic
            </h1>
            <p
              className="mx-auto max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: F.body,
              }}
            >
              {SHORT_BLURB}
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="relative z-10 overflow-hidden rounded-3xl border border-white/60"
              style={{
                boxShadow: '0px 20px 50px rgba(226, 217, 220, 0.35)',
              }}
            >
              <img
                src={aboutDesk}
                alt="Student studying with mobile and notes"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 z-20 hidden w-[42%] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block">
              <img
                src={aboutProgress}
                alt="Student checking progress on phone"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="absolute -right-3 top-6 z-20 hidden rounded-2xl bg-white px-3.5 py-2.5 shadow-xl sm:flex sm:items-center sm:gap-2">
              <span
                className="flex size-8 items-center justify-center rounded-lg text-white"
                style={{ background: F.cta }}
              >
                <Sparkles className="size-4" />
              </span>
              <div className="leading-tight">
                <p
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: F.cta }}
                >
                  AI-powered
                </p>
                <p className="text-xs font-medium" style={{ color: F.body }}>
                  Smart exam prep
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full about story */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: F.label }}
          >
            Who we are
          </p>
          <h2
            className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: F.heading,
            }}
          >
            What is Prepmagic?
          </h2>
          <div className="mt-8 space-y-5">
            {ABOUT_PARAS.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="text-base leading-relaxed sm:text-lg"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: F.body,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Vision — home CTA colors */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8 lg:px-8">
          <article
            className="rounded-3xl border bg-white p-8 sm:p-10"
            style={{ borderColor: F.cardBorder }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-lg text-white"
              style={{ background: F.cta }}
            >
              <Target className="size-6" strokeWidth={1.85} />
            </div>
            <p
              className="mt-6 text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: F.label }}
            >
              Our Mission
            </p>
            <h3
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: F.heading,
              }}
            >
              Our Mission
            </h3>
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: F.body }}
            >
              {MISSION}
            </p>
          </article>

          <article
            className="rounded-3xl border bg-white p-8 sm:p-10"
            style={{ borderColor: F.cardBorder }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-lg text-white"
              style={{ background: F.cta }}
            >
              <Eye className="size-6" strokeWidth={1.85} />
            </div>
            <p
              className="mt-6 text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: F.label }}
            >
              Our Vision
            </p>
            <h3
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: F.heading,
              }}
            >
              Our Vision
            </h3>
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: F.body }}
            >
              {VISION}
            </p>
          </article>
        </div>
      </section>

      {/* Closing CTA strip */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src={aboutCoaching}
              alt="Students learning together for board exams"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
          <div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: F.heading,
              }}
            >
              Learn with confidence
            </h2>
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: F.body }}
            >
              Smart learning tools, comprehensive study resources, and
              data-driven insights — so every student can perform better in
              every examination.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

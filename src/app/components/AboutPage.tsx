import {
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

import imageOne from '../../images/im1.jpg';
import imageTwo from '../../images/im2.jpg';
import imageThree from '../../images/im3.jpg';
import imageFour from '../../images/im4.jpg';
import aboutDesk from '../../images/about-study-desk.jpg';
import aboutBoy from '../../images/about-boy-revise.jpg';
import aboutCoaching from '../../images/about-coaching-group.jpg';
import aboutNotes from '../../images/about-notes-write.jpg';
import aboutProgress from '../../images/about-progress-phone.jpg';
import aboutSchool from '../../images/about-school-campus.jpg';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const featureRows = [
  {
    title: '10 Years Question Bank',
    body: [
      'Practice previous year board exam questions by class, board, subject, and chapter — without hunting through PDFs or guides.',
      'See real exam patterns, repeated chapters, and answer methods with detailed solutions.',
    ],
    image: aboutDesk,
    imageAlt: 'Student studying with notes and mobile at a desk',
    icon: BookOpen,
    accent: 'from-blue-600 to-teal-500',
  },
  {
    title: 'AI Exam Prediction',
    body: [
      'Prioritize revision with trends from past papers, chapter weightage, and question frequency.',
      'A smart assistant for limited time — not a guarantee of exact exam questions.',
    ],
    image: aboutBoy,
    imageAlt: 'Student revising board exams with books and phone',
    icon: Brain,
    accent: 'from-teal-600 to-cyan-500',
  },
  {
    title: 'Most Repeated Questions',
    body: [
      'Focus on concepts and formats that appear again and again in board exams.',
      'Build speed, confidence, and the answer style examiners expect.',
    ],
    image: aboutNotes,
    imageAlt: 'Student writing revision notes with highlighter and phone',
    icon: TrendingUp,
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Important Questions',
    body: [
      'Practice high-priority questions curated for board revision — so students focus on what matters most before exams.',
      'When a school or coaching shares important questions, students get them directly in the app for targeted practice.',
    ],
    image: imageFour,
    imageAlt: 'Student focusing on important exam questions',
    icon: Star,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Mock Tests',
    body: [
      'Attempt exam-like tests to improve time management, accuracy, and pressure handling.',
      'Turn preparation into measurable progress before the real board exam.',
    ],
    image: imageOne,
    imageAlt: 'Student preparing for timed practice tests',
    icon: Trophy,
    accent: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Performance Tracking',
    body: [
      'See strong and weak subjects clearly through practice history, scores, and progress signals.',
      'Know where you are improving and what still needs revision — so study time is used wisely.',
    ],
    image: aboutProgress,
    imageAlt: 'Student checking study progress on phone with planner',
    icon: Users,
    accent: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Chapter & Topic Insights',
    body: [
      'Understand which chapters and topics deserve more attention based on question patterns.',
      'Build a clearer revision plan instead of guessing what to study next.',
    ],
    image: imageTwo,
    imageAlt: 'Student planning chapter-wise revision with books',
    icon: Target,
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'School & Coaching Connect',
    body: [
      'Students who study in a school or coaching can connect their institute in the Prepmagic app.',
      'Once linked, they receive institute mock tests, important questions, and updates from their own school or coaching.',
    ],
    image: aboutCoaching,
    imageAlt: 'Students studying together in a coaching setting',
    icon: Building2,
    accent: 'from-indigo-600 to-blue-600',
  },
  {
    title: 'School & Coaching Dashboard',
    body: [
      'Schools and coachings get a dedicated dashboard to manage students, share important questions, and run institute mock tests.',
      'Teachers support students on the same app students already use — classroom prep and board practice in one place.',
    ],
    image: aboutSchool,
    imageAlt: 'Indian school campus with students and notebooks',
    icon: Briefcase,
    accent: 'from-cyan-600 to-teal-700',
  },
  {
    title: 'Syllabus Coverage & Career Assistant',
    body: [
      'Prepare systematically across the full Class 10 and Class 12 syllabus.',
      'Get practical direction on streams, colleges, and next steps after boards.',
    ],
    image: imageThree,
    imageAlt: 'Student planning studies and next steps after boards',
    icon: Sparkles,
    accent: 'from-slate-700 to-blue-700',
  },
];

function FeatureRow({
  title,
  body,
  image,
  imageAlt,
  icon: Icon,
  accent,
  imageLeft,
}: {
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
  icon: typeof BookOpen;
  accent: string;
  imageLeft: boolean;
}) {
  return (
    <motion.div
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className={imageLeft ? 'order-1' : 'order-1 lg:order-2'}>
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_28px_60px_-28px_rgba(15,23,42,0.45)]">
          <img
            src={image}
            alt={imageAlt}
            className="aspect-[16/11] w-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accent}`} />
        </div>
      </div>

      <div className={imageLeft ? 'order-2' : 'order-2 lg:order-1'}>
        <div
          className={`mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
        >
          <Icon className="size-6" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h3>
        <div className="mt-4 space-y-3">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO page="about" />
      <SideNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_40%)]" />
        <motion.div
          className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 16, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -18, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
          <motion.div
            className="space-y-5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              About Prepmagic
            </motion.p>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
            >
              Prepmagic
            </motion.h1>
            <motion.p
              className="mx-auto max-w-xl text-lg text-teal-50 sm:text-xl lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
            >
              Board exam preparation for CBSE & Bihar Board — practice, mock tests, insights, and progress in one app.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 pt-1 lg:justify-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {['Class 10 & 12', 'CBSE', 'Bihar Board'].map((chip, i) => (
                <motion.span
                  key={chip}
                  className="rounded-full border border-white/35 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.div
              className="relative z-10 overflow-hidden rounded-3xl border border-white/30 shadow-2xl shadow-teal-950/35"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={aboutDesk}
                alt="Student studying with mobile and notes"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-4 z-20 hidden w-[42%] overflow-hidden rounded-2xl border-4 border-white/90 shadow-xl sm:block"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.45 },
                scale: { delay: 0.5, duration: 0.45 },
                y: { delay: 0.8, duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <img
                src={aboutProgress}
                alt="Student checking progress on phone"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -right-3 top-6 z-20 hidden rounded-2xl bg-white px-3.5 py-2.5 text-slate-800 shadow-xl sm:flex sm:items-center sm:gap-2"
              animate={{ y: [0, 8, 0], opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Sparkles className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">Daily practice</p>
                <p className="text-xs font-medium text-slate-600">Notes + mobile learning</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro — left-right with image (not empty text strip) */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Why Prepmagic</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built for one practical question
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              What should a student practice today to improve exam score? Prepmagic brings previous year questions,
              important questions, mock tests, performance tracking, and school/coaching connect into one simple
              mobile experience for Class 10 and Class 12.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Question bank', 'Important questions', 'Performance tracking', 'School & coaching'].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700"
                >
                  <span className="size-2 rounded-full bg-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[1.75rem] shadow-[0_28px_60px_-28px_rgba(15,23,42,0.4)]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={aboutProgress}
              alt="Student checking learning progress with notes"
              className="aspect-[16/11] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Feature rows — unique images, alternating sides */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl space-y-20 px-4 sm:space-y-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything that works together
            </h2>
          </div>

          {featureRows.map((row, index) => (
            <FeatureRow key={row.title} {...row} imageLeft={index % 2 === 0} />
          ))}
        </div>
      </section>

      {/* Closing — left-right with image, not empty dark strip */}
      <section className="bg-slate-950 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
            <img
              src={aboutCoaching}
              alt="Students learning together for board exams"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              More than a question bank
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Question bank, important questions, AI priority, mock tests, performance tracking, school and coaching
              connect with institute dashboards, syllabus coverage, and career guidance — a complete board exam
              preparation system for CBSE and Bihar Board students.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Students', 'Schools', 'Coachings'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-teal-400/40 bg-teal-500/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

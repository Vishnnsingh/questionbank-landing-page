import { Check } from 'lucide-react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

/** Home brand tokens — Hero CTA + Winning Edge cards */
const F = {
  cta: '#0F8F84',
  heading: '#1B2A4A',
  body: '#444444',
  label: '#4B5A78',
  badgeBorder: '#C7D0E6',
  white: '#FFFFFF',
  heroGray: '#F0F0F0',
  cardBorder: '#C3C6D1',
  cardTitle: '#161618',
  cardBody: '#767676',
  muted: '#575E71',
  iconTeal: '#0F8F84',
  qrBorder: 'rgba(15, 143, 132, 0.5)',
  statsShadow: '0px 20px 50px rgba(226, 217, 220, 0.3)',
  gradient:
    'linear-gradient(97.77deg, rgba(20, 184, 166, 0.5) 0%, rgba(208, 247, 234, 0.5) 97.73%)',
} as const;

const titleFont =
  "'Libre Caslon Text', 'Playfair Display', Georgia, serif";
const bodyFont = "'Manrope', 'Inter', system-ui, sans-serif";
const labelFont = "'DM Sans', system-ui, sans-serif";
const displayFont = "'Playfair Display', Georgia, serif";
const ctaFont = "'Inter', system-ui, sans-serif";

const EDGE_ICONS = [
  { src: '/image/winning-edge/qb.svg', w: 18.65, h: 14.85 },
  { src: '/image/winning-edge/ai.svg', w: 17.89, h: 19 },
  { src: '/image/winning-edge/target.svg', w: 17, h: 19 },
  { src: '/image/winning-edge/mock.svg', w: 18.5, h: 18.5 },
  { src: '/image/winning-edge/chapter.svg', w: 20.99, h: 17.55 },
  { src: '/image/winning-edge/performance.svg', w: 21.5, h: 16.14 },
  { src: '/image/winning-edge/syllabus.svg', w: 21, h: 14.9 },
  { src: '/image/winning-edge/career.svg', w: 18.42, h: 18.42 },
] as const;

const DECOR = [
  '/image/winning-edge/decor-vector2.svg',
  '/image/winning-edge/decor-vector3.svg',
] as const;

function CardDecor({ src }: { src: string }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[40%] left-[30%] right-0 h-[160px] overflow-hidden opacity-80"
      aria-hidden
    >
      <div className="h-full w-full rotate-180">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover object-left-bottom"
        />
      </div>
    </div>
  );
}

type SeoPageKey =
  | 'cbseQuestionBank'
  | 'biharBoardQuestionBank'
  | 'class10QuestionBank'
  | 'class12QuestionBank'
  | 'blogBiharClass12Questions'
  | 'blogCbseClass10RepeatedQuestions';

const seoPages: Record<
  SeoPageKey,
  {
    eyebrow: string;
    title: string;
    intro: string;
    highlights: string[];
    sections: { title: string; body: string[]; bullets?: string[] }[];
  }
> = {
  cbseQuestionBank: {
    eyebrow: 'CBSE Question Bank',
    title: 'CBSE Question Bank 2025-26 | Class 10 & 12 Previous Year Questions',
    intro:
      'Prepmagic par CBSE Class 10 aur Class 12 ke 20,000+ previous year questions practice karo. Objective, short answer, long answer, case-based questions, aur chapter-wise board exam practice ek jagah.',
    highlights: ['20,000+ CBSE questions', 'Class 10 & 12', 'MCQ + subjective practice', 'INR pricing'],
    sections: [
      {
        title: 'CBSE Class 10 Question Bank',
        body: [
          'Class 10 Mathematics, Science, Social Science, English, aur Hindi ke chapter-wise previous year questions available hain.',
          'Students important chapters, repeated topics, MCQ patterns, aur long-answer writing practice ek organized flow me kar sakte hain.',
        ],
        bullets: [
          'Mathematics: Triangles, Surface Areas & Volumes, Statistics, Probability',
          'Science: Electricity, Light, Life Processes, Chemical Reactions',
          'Social Science: Nationalism, Resources, Power Sharing, Economics basics',
          'English and Hindi: Literature, grammar, writing skills, comprehension',
        ],
      },
      {
        title: 'CBSE Class 12 Question Bank',
        body: [
          'Class 12 Physics, Chemistry, Biology, Mathematics, Accountancy, Economics, aur major board subjects ke previous year questions included hain.',
          'Prepmagic students ko high-weightage topics identify karne, mock practice karne, aur board-style answers likhne me help karta hai.',
        ],
        bullets: [
          'Physics: Current Electricity, Optics, Semiconductor Electronics',
          'Chemistry: Coordination Compounds, Electrochemistry, Organic conversions',
          'Biology: Genetics, Reproduction, Biotechnology, Ecology',
          'Commerce: Accountancy, Economics, Business Studies practice',
        ],
      },
      {
        title: 'Why Prepmagic for CBSE',
        body: [
          'Prepmagic focuses on actual board preparation rather than generic video-only learning. Question practice, repeated patterns, chapter distribution, and exam-style answers are the core workflow.',
        ],
      },
    ],
  },
  biharBoardQuestionBank: {
    eyebrow: 'Bihar Board Question Bank',
    title: 'Bihar Board Question Bank 2025-26 | BSEB Class 10 & 12 Previous Year Questions',
    intro:
      'Bihar Board students ke liye Prepmagic me 20,000+ BSEB previous year questions, Objective MCQ, short answer, long answer, aur subject-wise practice available hai.',
    highlights: ['20,000+ BSEB questions', 'Matric + Inter', 'Objective questions focus', 'Hindi + English support'],
    sections: [
      {
        title: 'Bihar Board Class 10 Matric',
        body: [
          'BSEB Class 10 students ke liye Vigyan, Ganit, Hindi, English, Samajik Vigyan, Sanskrit aur major subjects ke question sets organized hain.',
          'Bihar Board pattern me objective questions ka role strong hota hai, isliye Prepmagic MCQ practice aur subjective answer writing dono cover karta hai.',
        ],
        bullets: [
          'Vigyan: 900+ practice questions',
          'Ganit: 800+ previous year questions',
          'Hindi and English: literature, grammar, writing practice',
          'Samajik Vigyan: History, Civics, Geography, Economics topics',
        ],
      },
      {
        title: 'Bihar Board Class 12 Inter',
        body: [
          'Science, Arts, aur Commerce stream ke Class 12 students ke liye Physics, Chemistry, Biology, Mathematics, History, Geography, Political Science, Economics, Accountancy, aur Hindi questions included hain.',
        ],
        bullets: [
          'Physics and Chemistry: numericals, derivations, objective practice',
          'Biology: diagrams, definitions, genetics, ecology',
          'Arts: History, Geography, Political Science, Economics',
          'Commerce: Accountancy and Business Studies practice',
        ],
      },
      {
        title: 'BSEB Preparation Strategy',
        body: [
          'Daily objective practice, previous year paper revision, high-weightage chapter focus, aur model-answer writing Bihar Board preparation ke liye sabse useful combination hai.',
        ],
      },
    ],
  },
  class10QuestionBank: {
    eyebrow: 'Class 10',
    title: 'Class 10 Question Bank 2025-26 | CBSE & Bihar Board 10th Previous Year Questions',
    intro:
      'Class 10 ke liye Prepmagic CBSE aur Bihar Board dono boards ke previous year questions, chapter-wise practice, MCQ, subjective answers, aur board exam strategy provide karta hai.',
    highlights: ['Class 10 board exam', 'CBSE + Bihar Board', '20,000+ questions', 'Chapter-wise practice'],
    sections: [
      {
        title: 'Important Class 10 Subjects',
        body: [
          'Mathematics, Science, Social Science, Hindi, English, aur board-specific language subjects ke liye organized question bank available hai.',
        ],
        bullets: [
          'Mathematics: formulas, numericals, geometry, statistics',
          'Science: physics, chemistry, biology concepts',
          'Social Science: history, geography, civics, economics',
          'Languages: grammar, literature, writing sections',
        ],
      },
      {
        title: 'Class 10 Preparation Guide',
        body: [
          'Previous year questions repeat-pattern samjhate hain. Students ko daily MCQ practice, weekly mock test, aur chapter revision schedule follow karna chahiye.',
        ],
      },
      {
        title: 'Score Better in Class 10',
        body: [
          '90%+ score ke liye high-weightage chapters pe focus, answer presentation, formula revision, map/diagram practice, aur timed mock tests zaroori hain.',
        ],
      },
    ],
  },
  class12QuestionBank: {
    eyebrow: 'Class 12',
    title: 'Class 12 Question Bank 2025-26 | CBSE & Bihar Board 12th Previous Year Questions',
    intro:
      'Class 12 Science, Commerce, aur Arts students ke liye Prepmagic previous year questions, board-wise question bank, objective practice, aur stream-wise preparation guidance provide karta hai.',
    highlights: ['Class 12 board exam', 'Science + Commerce + Arts', 'CBSE + BSEB', 'Stream-wise practice'],
    sections: [
      {
        title: 'Science Stream',
        body: [
          'Physics, Chemistry, Biology, aur Mathematics ke numericals, derivations, diagrams, concepts, MCQ aur long-answer questions practice kar sakte hain.',
        ],
      },
      {
        title: 'Commerce Stream',
        body: [
          'Accountancy, Economics, Business Studies, aur related commerce topics ke previous year and model-style questions included hain.',
        ],
      },
      {
        title: 'Arts Stream',
        body: [
          'History, Geography, Political Science, Economics, Hindi aur other subjects ke board-style questions practice ke liye structured content available hai.',
        ],
      },
    ],
  },
  blogBiharClass12Questions: {
    eyebrow: 'Blog',
    title: 'Bihar Board Class 12 Previous Year Questions 2026 | BSEB Inter Question Bank',
    intro:
      'Bihar Board Class 12 previous year questions se students exam pattern, objective-question weightage, repeated chapters, aur answer-writing strategy clearly samajh sakte hain.',
    highlights: ['BSEB Inter', 'Science, Arts, Commerce', 'Objective + subjective', '2026 preparation'],
    sections: [
      {
        title: 'Bihar Board Class 12 Exam Pattern',
        body: [
          'Bihar Board Class 12 exam me objective questions aur subjective questions dono important hote hain. Objective questions high-scoring hote hain, jabki subjective answers me presentation aur structure matter karta hai.',
        ],
      },
      {
        title: 'Subject-Wise Focus',
        body: [
          'Physics me Current Electricity, Optics, Semiconductor; Chemistry me Electrochemistry, Coordination Compounds, Organic reactions; Biology me Genetics, Reproduction, Biotechnology; Maths me Calculus, Vectors, Probability high-value topics hain.',
        ],
      },
      {
        title: 'Best Preparation Strategy',
        body: [
          'Syllabus samjho, previous year questions practice karo, objective section daily revise karo, subjective answers likh kar practice karo, aur final months me mock tests solve karo.',
        ],
      },
    ],
  },
  blogCbseClass10RepeatedQuestions: {
    eyebrow: 'Blog',
    title: 'CBSE Class 10 ke Sabse Zyada Repeated Questions | Top Questions Guide',
    intro:
      'CBSE Class 10 board exam me repeated question patterns ko samajhna smart revision ka best shortcut hai. Prepmagic students ko important questions, chapters, aur board-style practice organize karke deta hai.',
    highlights: ['CBSE Class 10', 'Repeated questions', 'Mathematics + Science + SST', 'Board exam 2026'],
    sections: [
      {
        title: 'Most Repeated Subject Areas',
        body: [
          'Mathematics me Triangles, Surface Areas & Volumes, Statistics; Science me Electricity, Light, Life Processes; Social Science me Nationalism, Resources, Power Sharing jaise chapters repeated pattern me strong hain.',
        ],
      },
      {
        title: 'How to Practice',
        body: [
          'Repeated questions ko rote-learn karne ke bajay unke concept, format, marking scheme, aur answer presentation ko samjho. Timed practice se speed aur confidence dono improve hote hain.',
        ],
      },
    ],
  },
};

export function SeoLandingPage({ page }: { page: SeoPageKey }) {
  const content = seoPages[page];

  return (
    <div className="min-h-screen" style={{ background: F.heroGray }}>
      <SEO page={page} />
      <SideNav />
      <main className="mx-auto max-w-[1138px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Hero — home badge + Playfair + Register CTA */}
        <section
          className="relative mb-10 overflow-hidden rounded-[18px] border bg-white p-6 sm:p-8 lg:p-10"
          style={{
            borderColor: 'rgba(15, 143, 132, 0.22)',
            boxShadow: F.statsShadow,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: F.gradient }}
            aria-hidden
          />
          <div className="relative">
            <div
              className="inline-flex h-10 items-center gap-2.5 px-3.5 sm:h-11"
              style={{
                background: F.white,
                border: `1px solid ${F.badgeBorder}`,
                borderRadius: 20,
              }}
            >
              <span
                className="size-[7px] shrink-0 rounded-full"
                style={{ background: F.cta }}
                aria-hidden
              />
              <span
                className="text-[13px] font-semibold uppercase tracking-wide sm:text-[14px]"
                style={{ fontFamily: labelFont, color: F.cardTitle }}
              >
                {content.eyebrow}
              </span>
            </div>

            <h1
              className="mt-4 max-w-4xl text-[28px] font-bold leading-[1.25] sm:text-[36px] lg:text-[42px] lg:leading-[1.3]"
              style={{ fontFamily: displayFont, color: F.heading }}
            >
              {content.title}
            </h1>
            <p
              className="mt-4 max-w-3xl text-[15px] leading-[1.5] sm:text-[17px] lg:text-[18px]"
              style={{ fontFamily: labelFont, color: F.body }}
            >
              {content.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-5">
              <a
                href="/signup"
                className="inline-flex h-12 w-[153px] shrink-0 items-center justify-center text-[15px] font-bold text-white transition hover:opacity-95 sm:h-[56px] sm:w-[180px] sm:text-[16px]"
                style={{
                  background: F.cta,
                  borderRadius: 10,
                  fontFamily: ctaFont,
                }}
              >
                Register Now
              </a>
              <a
                href="/choose-plan"
                className="inline-flex h-12 shrink-0 items-center justify-center px-6 text-[15px] font-bold transition hover:bg-white/80 sm:h-[56px] sm:px-8 sm:text-[16px]"
                style={{
                  border: `1px solid ${F.qrBorder}`,
                  borderRadius: 10,
                  color: F.cta,
                  fontFamily: ctaFont,
                  background: F.white,
                }}
              >
                View plans
              </a>
            </div>
          </div>
        </section>

        {/* Highlights — home check pills */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-center gap-2.5 rounded-xl border bg-white p-4"
              style={{
                borderColor: F.cardBorder,
                boxShadow: F.statsShadow,
              }}
            >
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: F.cta }}
                aria-hidden
              >
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span
                className="text-[14px] font-medium sm:text-[15px]"
                style={{ fontFamily: labelFont, color: F.muted }}
              >
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Section cards — Winning Edge icon + glass card */}
        <div className="grid gap-6 md:grid-cols-2">
          {content.sections.map((section, index) => {
            const icon = EDGE_ICONS[index % EDGE_ICONS.length];
            const decor = DECOR[index % DECOR.length];
            return (
              <article
                key={section.title}
                className="relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border p-8"
                style={{
                  background: F.white,
                  borderColor: F.cardBorder,
                }}
              >
                <CardDecor src={decor} />

                <div
                  className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: F.iconTeal }}
                >
                  <img
                    src={icon.src}
                    alt=""
                    aria-hidden
                    width={icon.w}
                    height={icon.h}
                    style={{ width: icon.w, height: icon.h }}
                  />
                </div>

                <h2
                  className="relative z-[1] mt-4 text-[22px] font-normal leading-8 sm:text-[24px]"
                  style={{ fontFamily: titleFont, color: F.cardTitle }}
                >
                  {section.title}
                </h2>

                <div className="relative z-[1] mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] font-normal leading-6 sm:text-[16px]"
                      style={{ fontFamily: bodyFont, color: F.cardBody }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets ? (
                  <ul className="relative z-[1] mt-5 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[14px] sm:text-[15px]"
                        style={{ fontFamily: labelFont, color: F.muted }}
                      >
                        <span
                          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ background: F.cta }}
                          aria-hidden
                        >
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA band — home Get Started */}
        <section
          className="mt-12 overflow-hidden rounded-[18px] px-6 py-8 sm:px-10 sm:py-10"
          style={{ background: F.cta }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="text-[24px] font-medium leading-tight sm:text-[28px]"
                style={{ fontFamily: displayFont, color: F.white }}
              >
                Start board exam practice today
              </h2>
              <p
                className="mt-2 max-w-xl text-[15px] leading-relaxed sm:text-[16px]"
                style={{ fontFamily: bodyFont, color: 'rgba(255,255,255,0.9)' }}
              >
                Register free, pick a plan, and practice previous year questions
                for CBSE &amp; Bihar Board.
              </p>
            </div>
            <a
              href="/signup"
              className="inline-flex h-[56px] shrink-0 items-center justify-center px-8 text-[16px] font-bold transition hover:opacity-95"
              style={{
                background: F.white,
                color: F.cta,
                borderRadius: 10,
                fontFamily: ctaFont,
              }}
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

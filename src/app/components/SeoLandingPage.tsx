import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import { pageMeta } from '../seo';

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
      'Honhaar par CBSE Class 10 aur Class 12 ke 20,000+ previous year questions practice karo. Objective, short answer, long answer, case-based questions, aur chapter-wise board exam practice ek jagah.',
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
          'Honhaar students ko high-weightage topics identify karne, mock practice karne, aur board-style answers likhne me help karta hai.',
        ],
        bullets: [
          'Physics: Current Electricity, Optics, Semiconductor Electronics',
          'Chemistry: Coordination Compounds, Electrochemistry, Organic conversions',
          'Biology: Genetics, Reproduction, Biotechnology, Ecology',
          'Commerce: Accountancy, Economics, Business Studies practice',
        ],
      },
      {
        title: 'Why Honhaar for CBSE',
        body: [
          'Honhaar focuses on actual board preparation rather than generic video-only learning. Question practice, repeated patterns, chapter distribution, and exam-style answers are the core workflow.',
        ],
      },
    ],
  },
  biharBoardQuestionBank: {
    eyebrow: 'Bihar Board Question Bank',
    title: 'Bihar Board Question Bank 2025-26 | BSEB Class 10 & 12 Previous Year Questions',
    intro:
      'Bihar Board students ke liye Honhaar me 20,000+ BSEB previous year questions, Objective MCQ, short answer, long answer, aur subject-wise practice available hai.',
    highlights: ['20,000+ BSEB questions', 'Matric + Inter', 'Objective questions focus', 'Hindi + English support'],
    sections: [
      {
        title: 'Bihar Board Class 10 Matric',
        body: [
          'BSEB Class 10 students ke liye Vigyan, Ganit, Hindi, English, Samajik Vigyan, Sanskrit aur major subjects ke question sets organized hain.',
          'Bihar Board pattern me objective questions ka role strong hota hai, isliye Honhaar MCQ practice aur subjective answer writing dono cover karta hai.',
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
      'Class 10 ke liye Honhaar CBSE aur Bihar Board dono boards ke previous year questions, chapter-wise practice, MCQ, subjective answers, aur board exam strategy provide karta hai.',
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
      'Class 12 Science, Commerce, aur Arts students ke liye Honhaar previous year questions, board-wise question bank, objective practice, aur stream-wise preparation guidance provide karta hai.',
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
      'CBSE Class 10 board exam me repeated question patterns ko samajhna smart revision ka best shortcut hai. Honhaar students ko important questions, chapters, aur board-style practice organize karke deta hai.',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <SEO page={page} />
      <SideNav />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-blue-700 transition-colors hover:text-teal-700">
            <ArrowLeft className="size-4" />
            Back to home
          </a>

          <section className="relative mb-10 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="relative">
              <p className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-teal-700">{content.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-3xl tracking-tight text-slate-950 sm:text-5xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{content.intro}</p>
            </div>
          </section>

          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 rounded-xl border border-teal-100 bg-white p-4 text-sm font-medium text-slate-700 shadow-md shadow-slate-200/60">
                <CheckCircle2 className="size-5 shrink-0 text-teal-600" />
                {highlight}
              </div>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {content.sections.map((section) => (
              <section key={section.title} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl sm:p-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400" />
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h2 className="text-2xl leading-tight text-slate-950">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-slate-600">{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </main>
        <Footer />
    </div>
  );
}

import { ArrowLeft, CheckCircle2, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import { SUPPORT_EMAIL, SUPPORT_PHONE, pageMeta, products } from '../seo';

type PolicyPageKey = 'about' | 'contact' | 'support' | 'terms' | 'refunds' | 'privacy';

const pageContent: Record<PolicyPageKey, { eyebrow: string; title: string; sections: { title: string; body: string[] }[] }> = {
  about: {
    eyebrow: 'About',
    title: 'About Honhaar Features',
    sections: [
      {
        title: 'Honhaar - Board Exam Preparation App',
        body: [
          'Honhaar is a focused board exam preparation app for Class 10 and Class 12 students preparing for CBSE and Bihar Board exams. The app is built around practice, revision, repeated question analysis, mock tests, and performance tracking so students can prepare with a clear plan instead of random notes.',
          'Every feature in Honhaar is designed to answer one practical question: what should a student practice today to improve exam score? The platform brings previous year questions, important-topic insights, syllabus coverage, and progress tracking into one simple mobile experience.',
        ],
      },
      {
        title: '10 Years Question Bank',
        body: [
          'The 10 Years Question Bank gives students access to previous year board exam questions in an organized format. Instead of searching across PDFs, guide books, or random websites, students can practice questions by class, board, subject, and chapter.',
          'Previous year questions are useful because they reveal the real exam pattern. Students can understand which chapters repeat, what type of questions are asked, how objective and subjective questions are framed, and how much depth is expected in answers. With detailed solutions, students do not just memorize answers; they learn the method behind each question.',
        ],
      },
      {
        title: 'AI Exam Prediction',
        body: [
          'AI Exam Prediction helps students identify questions and topics that may be more important based on past exam trends, repeated question patterns, chapter weightage, and question frequency. This feature is not a guarantee of exact exam questions; it is a smart preparation assistant that helps students prioritize revision.',
          'For students with limited time before exams, prediction-based preparation can be very useful. It highlights the topics that deserve extra attention, so students can revise intelligently while still covering the complete syllabus.',
        ],
      },
      {
        title: 'Most Repeated Questions',
        body: [
          'Most Repeated Questions shows questions and concepts that appear frequently in board exams. Many board exams follow recognizable patterns, and some chapters or question formats come again and again with small changes.',
          'This feature helps students avoid wasting time on low-priority material. By practicing repeated questions, students build confidence, improve speed, and understand the answer style expected by examiners.',
        ],
      },
      {
        title: 'Mock Tests',
        body: [
          'Mock Tests help students practice in a real exam-like environment. A student may know the chapter, but exam performance also depends on time management, accuracy, pressure handling, and question selection.',
          'Honhaar mock tests are useful for checking preparation level before the actual exam. Students can attempt objective questions, revise weak areas, and develop the habit of completing questions within time. Regular mock tests turn preparation into measurable progress.',
        ],
      },
      {
        title: 'Chapter & Topic Insights',
        body: [
          'Chapter & Topic Insights show which chapters and topics are more important based on question patterns and syllabus distribution. This helps students understand where to spend more time during revision.',
          'For example, a student preparing for Science, Mathematics, Physics, Chemistry, Biology, History, or Economics can see which topics need more practice. Topic insights make preparation more focused and reduce confusion during the final weeks before exams.',
        ],
      },
      {
        title: 'Performance Tracking',
        body: [
          'Performance Tracking helps students identify strong and weak subjects. Without tracking, students often feel they are studying a lot but do not know whether they are improving. Honhaar makes preparation visible through practice history and performance signals.',
          'Students can see where they are making mistakes, which subjects need revision, and whether their mock test performance is improving over time. This helps them create a better study plan and focus on weak areas before the exam.',
        ],
      },
      {
        title: 'Complete Syllabus Coverage',
        body: [
          'Complete Syllabus Coverage ensures that students do not prepare only selected chapters and miss important parts of the curriculum. Honhaar is designed to support full board exam preparation for Class 10 and Class 12.',
          'The app organizes content by board, class, subject, chapter, and question type. This makes it easier for students to revise systematically and maintain confidence that their preparation is not incomplete.',
        ],
      },
      {
        title: 'Career Assistant',
        body: [
          'Career Assistant gives students guidance beyond question practice. After Class 10 and Class 12, students often need help understanding streams, college options, career paths, and subject choices.',
          'Honhaar Career Assistant is designed to support students with practical direction after board exams. It helps students think about college selection, career planning, and next academic steps so that exam preparation connects with long-term goals.',
        ],
      },
      {
        title: 'Why These Features Matter Together',
        body: [
          'Each feature solves a different part of the exam preparation journey. The question bank gives practice material, AI prediction gives priority, repeated questions show patterns, mock tests build exam confidence, insights guide revision, tracking measures progress, syllabus coverage keeps preparation complete, and career guidance helps students plan the next step.',
          'Together, these features make Honhaar more than a question bank. It becomes a complete board exam preparation system for CBSE and Bihar Board students.',
        ],
      },
    ],
  },
  contact: {
    eyebrow: 'Support',
    title: 'Contact Us',
    sections: [
      {
        title: 'Customer Support',
        body: [
          'For app access, payments, account issues, study material, mock tests, or refund questions, contact the Honhaar support team.',
          `Email: ${SUPPORT_EMAIL}`,
          `Phone: ${SUPPORT_PHONE}`,
          'Location: Patna, Bihar, India',
        ],
      },
      {
        title: 'Support Hours',
        body: [
          'Support requests are reviewed on working days. Payment and access issues are prioritized so students can continue exam preparation without delay.',
        ],
      },
    ],
  },
  support: {
    eyebrow: 'Help',
    title: 'Support',
    sections: [
      {
        title: 'App and Account Help',
        body: [
          'For login, app access, purchased plan activation, question bank access, mock tests, or performance analytics issues, contact our support team.',
          `Email: ${SUPPORT_EMAIL}`,
          `Mobile: ${SUPPORT_PHONE}`,
        ],
      },
      {
        title: 'Payment and Refund Help',
        body: [
          'For payment confirmation, duplicate payment, failed payment, or refund and cancellation queries, share your registered contact number, plan name, and payment reference.',
          'Support requests are reviewed on working days, with payment and access issues prioritized first.',
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    sections: [
      {
        title: 'Use of Service',
        body: [
          'Honhaar provides digital exam preparation products for CBSE and Bihar Board students, including question banks, mock tests, analytics, and study guidance.',
          'Users must provide accurate account and payment information and must not misuse, copy, resell, scrape, or redistribute app content without written permission.',
        ],
      },
      {
        title: 'Products and Pricing',
        body: products.map(
          (product) => `${product.name}: INR ${product.price} for ${product.duration}. ${product.description}`
        ),
      },
      {
        title: 'Educational Disclaimer',
        body: [
          'AI exam prediction and repeated question insights are preparation aids. They do not guarantee any specific exam question, marks, rank, admission, or academic result.',
        ],
      },
      {
        title: 'Account Access',
        body: [
          'Access is for the purchased plan duration and may require a valid registered mobile number, email, or app account. Sharing account access may lead to suspension.',
        ],
      },
    ],
  },
  refunds: {
    eyebrow: 'Policy',
    title: 'Refunds & Cancellations',
    sections: [
      {
        title: 'Refund Window',
        body: [
          'Eligible purchases may be refunded within 7 days if the user cannot access the purchased digital product because of a verified technical or payment issue.',
        ],
      },
      {
        title: 'Non-Refundable Cases',
        body: [
          'Refunds may not be available after substantial product usage, account sharing, policy misuse, or when the product is working as described and the user changes their mind after access is delivered.',
        ],
      },
      {
        title: 'Cancellation',
        body: [
          'Plans are one-time purchases for the listed duration. There is no recurring auto-renewal unless clearly shown during checkout.',
          `To request help, email ${SUPPORT_EMAIL} with your registered contact details, payment reference, product name, and issue summary.`,
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Policy',
    title: 'Privacy Policy',
    sections: [
      {
        title: 'Information We Handle',
        body: [
          'We may handle account details, support messages, payment references, device or app usage signals, mock test activity, and learning progress data needed to operate the service.',
        ],
      },
      {
        title: 'How Data Is Used',
        body: [
          'Data is used for account access, product delivery, payment support, learning analytics, app improvement, fraud prevention, and customer communication.',
        ],
      },
      {
        title: 'Contact for Privacy Requests',
        body: [
          `For privacy questions or account data requests, contact ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
};

export function PolicyPage({ page }: { page: PolicyPageKey }) {
  const content = pageContent[page];
  const isAbout = page === 'about';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <SEO page={page} />
      <SideNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-teal-700 transition-colors mb-10">
            <ArrowLeft className="size-4" />
            Back to home
          </a>

          <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
                <Sparkles className="size-4" />
                {content.eyebrow}
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl tracking-tight text-slate-950 sm:text-5xl">{content.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{pageMeta[page].description}</p>
              <p className="mt-4 text-sm text-slate-500">Last updated: June 7, 2026</p>
            </div>
          </div>

          {(page === 'contact' || page === 'support') && (
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700 hover:border-teal-400 transition-colors">
                <Mail className="size-5 text-teal-600 mb-3" />
                {SUPPORT_EMAIL}
              </a>
              <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700 hover:border-teal-400 transition-colors">
                <Phone className="size-5 text-teal-600 mb-3" />
                {SUPPORT_PHONE}
              </a>
              <div className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">
                <MapPin className="size-5 text-teal-600 mb-3" />
                Patna, Bihar, India
              </div>
            </div>
          )}

          <div className={isAbout ? 'grid gap-5 md:grid-cols-2' : 'grid gap-5 lg:grid-cols-2'}>
            {content.sections.map((section) => (
              <section
                key={section.title}
                className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl sm:p-6 ${
                  isAbout && section.title === 'Honhaar - Board Exam Preparation App' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400" />
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h2 className="text-xl leading-tight text-slate-950">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-slate-600 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
        <Footer />
    </div>
  );
}

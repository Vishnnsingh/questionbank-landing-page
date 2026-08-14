import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import dashboardPreview from '../../images/Dashbaord.png';
import mockTestPreview from '../../images/Mocktest.png';
import importantPreview from '../../images/Importantquestion.png';
import studentPreview from '../../images/Student.png';
import previousYearQuestions from '../../images/PreviousYearQuestions.svg';
import previousYearQuestions1 from '../../images/PreviousYearQuestions1.svg';
import repeatedInsights from '../../images/RepeatedInsights.svg';
import repeatedInsights1 from '../../images/RepeatedInsights1.svg';
import aiAnalysis from '../../images/AIAnalysis.svg';
import aiAnalysis1 from '../../images/AIAnalysis1.svg';

/**
 * PrepMagic-UI — THE MAGIC FORMULA
 * Figma: 86:709, 86:711, cards 86:712, tabs 86:764, panel 86:773
 */

const F = {
  label: '#A63426',
  heading: '#0F172A',
  navy: '#0B1C30',
  body: '#464555',
  border: '#BFBFBF',
  cardShadow: '0px 1px 1px rgba(0, 0, 0, 0.05)',
  /** Tab bar track — Figma 86:764 */
  tabTrack: '#EFF4FF',
  /** Active tab CTA — same as Register Now */
  cta: '#0F8F84',
  white: '#FFFFFF',
  /** Detail panel — Figma 86:773 */
  panelBg: 'rgba(109, 206, 174, 0.15)',
  panelBorder: 'rgba(199, 196, 216, 0.3)',
  panelShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
  muted: '#64748B',
} as const;

const CARDS = [
  {
    title: 'Previous Year Questions',
    description:
      'Every single paper from the last 15 years, digitally remastered and chapter-tagged.',
    images: [previousYearQuestions, previousYearQuestions1],
  },
  {
    title: 'Repeated Insights',
    description:
      'We track which questions reappear and when. Know exactly what the examiners are thinking.',
    images: [repeatedInsights, repeatedInsights1],
  },
  {
    title: 'AI Analysis',
    description:
      'Our LLM-powered engine predicts the likelihood of any question appearing in your next exam.',
    images: [aiAnalysis, aiAnalysis1],
  },
] as const;

const TABS = [
  { id: 'bank', label: 'Dashboard' },
  { id: 'mock', label: 'Mock Tests' },
  { id: 'ai', label: 'Important question' },
  { id: 'track', label: 'Student Tracker' },
] as const;
// added images for the panel copy
const PANEL_COPY: Record<
  (typeof TABS)[number]['id'],
  { title: string; body: string; cta: string; image: string; imageAlt: string }
> = {
  bank: {
    title: 'Dashboard View',
    body: '20,000+ questions tagged by difficulty, chapter, and "repeat frequency".',
    cta: 'Explore Bank',
    image: dashboardPreview,
    imageAlt: 'Dashboard preview',
  },
  mock: {
    title: 'Exam-ready Mocks',
    body: 'Timed papers that mirror board patterns so you build stamina and accuracy.',
    cta: 'Start Mock',
    image: mockTestPreview,
    imageAlt: 'Mock Tests preview',
  },
  ai: {
    title: 'Important question',
    body: 'See which topics and questions are most likely to appear next board season.',
    cta: 'View Insights',
    image: importantPreview,
    imageAlt: 'Important Questions preview',
  },
  track: {
    title: 'Student Tracker',
    body: 'Track weak chapters, accuracy streaks, and rank against peers in real time.',
    cta: 'Open Dashboard',
    image: studentPreview,
    imageAlt: 'Student Tracker preview',
  },
};

export function MagicFormulaSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('bank');
  const panel = PANEL_COPY[tab];

  return (
    <section
      id="magic-formula"
      className="w-full bg-white px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8"
      aria-labelledby="magic-formula-heading"
    >
      <div className="mx-auto w-full max-w-[1216px]">
        <p
          className="text-center text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px] sm:leading-6"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.label,
          }}
          data-node-id="86:709"
        >
          THE MAGIC FORMULA
        </p>

        <h2
          id="magic-formula-heading"
          className="mx-auto mt-2 max-w-[490px] text-center text-[28px] font-medium leading-tight tracking-[-0.48px] sm:mt-3 sm:text-[42px] sm:leading-[56px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: F.heading,
          }}
          data-node-id="86:711"
        >
          Engineered for Academic Mastery
        </h2>

        {/* 3 cards — Figma 86:712 */}
        <div
          className="mx-auto mt-10 grid max-w-[1216px] grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6"
          data-node-id="86:712"
        >
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-3xl border bg-white p-6"
              style={{
                borderColor: F.border,
                boxShadow: F.cardShadow,
              }}
            >
              <div className="flex w-full items-center justify-center gap-3">
                {card.images.map((src, idx) => (
                  <div
                    key={`${card.title}-${idx}`}
                    className="h-[220px] w-[48%] overflow-hidden rounded-2xl"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <h3
                className="mt-4 text-[16px] leading-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: F.navy,
                }}
              >
                {card.title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-6 sm:text-[16px]"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: F.body,
                }}
              >
                {card.description}
              </p>
            </article>
          ))}
        </div>

        {/* Tabs — Figma 86:764 · active = #0F8F84 CTA r12 */}
        <div className="mx-auto mt-14 sm:mt-16">
          <p
            className="text-center text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px] sm:leading-6"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: F.label,
            }}
          >
            Any school &amp; Institute
          </p>
          <h3
            className="mx-auto mt-2 max-w-[640px] text-center text-[28px] font-medium leading-tight tracking-[-0.48px] sm:mt-3 sm:text-[42px] sm:leading-[56px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: F.heading,
            }}
          >
            Also learn from your Institute &amp; school
          </h3>
          <div
            className="mx-auto mt-5 w-full max-w-[560px] p-1.5 sm:mt-6 sm:h-11 sm:p-1"
            style={{ background: F.tabTrack, borderRadius: 10 }}
            role="tablist"
            aria-label="Magic formula views"
            data-node-id="86:764"
          >
            <div className="grid grid-cols-2 gap-1.5 sm:flex sm:h-full sm:grid-cols-none sm:gap-1">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className="inline-flex min-h-11 w-full items-center justify-center whitespace-nowrap px-2.5 text-[13px] font-bold tracking-[0.14px] transition hover:opacity-95 sm:h-9 sm:min-h-0 sm:min-w-0 sm:flex-1 sm:px-3 sm:text-[14px]"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      borderRadius: 10,
                      background: active ? F.cta : 'transparent',
                      color: active ? F.white : F.body,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail panel — Figma 86:773 mint + r40 + deep shadow */}
        <div
          className="mx-auto mt-6 aspect-auto overflow-hidden sm:mt-8 lg:aspect-[16/10]"
          style={{
            background: F.panelBg,
            border: `1px solid ${F.panelBorder}`,
            borderRadius: 40,
            boxShadow: F.panelShadow,
          }}
          data-node-id="86:773"
        >
          <div className="grid h-full min-h-[320px] lg:grid-cols-[minmax(280px,1fr)_2fr]">
            {/* Left copy */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:min-h-0">
              <h3
                className="text-[18px] font-medium leading-6 sm:text-[20px] sm:leading-7"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: F.navy,
                }}
                data-node-id="86:777"
              >
                {panel.title}
              </h3>
              <p
                className="mt-3 max-w-[280px] text-[14px] leading-[1.5]"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: F.body,
                }}
                data-node-id="86:779"
              >
                {panel.body}
              </p>
              {/* CTA — Figma teal CTA curve (r10) like Register Now */}
              <a
                href="/contact-us"
                className="mt-6 inline-flex h-10 w-fit items-center justify-center gap-2 px-5 text-[14px] font-bold text-white transition hover:opacity-95 sm:h-11 sm:text-[15px]"
                style={{
                  background: F.cta,
                  borderRadius: 10,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {panel.cta}
                <ArrowRight className="size-3.5" strokeWidth={2.5} />
              </a>
            </div>

            {/* Right preview — white inset r24 */}
            <div className="p-6 sm:p-6 lg:p-6">
              <div
                className="flex h-full min-h-[240px] items-center justify-center overflow-hidden bg-white sm:min-h-[320px] lg:min-h-full"
                style={{ borderRadius: 24 }}
              >
                <img
                  key={tab}
                  src={panel.image}
                  alt={panel.imageAlt}
                  className="h-full w-full object-contain object-center p-2 sm:p-3"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

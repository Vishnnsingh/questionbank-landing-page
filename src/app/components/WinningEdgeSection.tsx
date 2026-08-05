/**
 * PrepMagic-UI — THE WINNING EDGE feature cards
 * Figma nodes 162:157–162:220 (2nd screenshot / glass cards)
 *
 * Card: white-glass rgba(255,255,255,…) · border #C3C6D1 · r12 · 314h · p32
 * Icon: 48×48 r8 · #0F8F84 · Figma SVG glyphs
 * Title: Libre Caslon · #161618 · 24/32
 * Body: Manrope · #767676 · 16/24
 * Decor: top-right slate wave (Vector rotate 180)
 */

const F = {
  label: '#A63426',
  slate: '#0F172A',
  stepNum: '#003466',
  stepLabel: '#424750',
  stepBorder: '#C3C6D1',
  /** Glass / white cards as Figma 162:157 + 2nd screenshot */
  cardBg: '#FFFFFF',
  cardBorder: '#C3C6D1',
  title: '#161618',
  body: '#767676',
  iconTeal: '#0F8F84',
} as const;

const STEPS = [
  { n: '01', label: 'Analyze' },
  { n: '02', label: 'Identify' },
  { n: '03', label: 'Focus' },
  { n: '04', label: 'Practice' },
  { n: '05', label: 'Refine' },
  { n: '06', label: 'Track' },
  { n: '07', label: 'Master' },
  { n: '08', label: 'Plan' },
] as const;

const DECOR_A = '/image/winning-edge/decor-vector2.svg';
const DECOR_B = '/image/winning-edge/decor-vector3.svg';

type EdgeFeature = {
  iconSrc: string;
  iconW: number;
  iconH: number;
  titleLines: string[];
  description: string;
  decorSrc: string;
};

/** Icon sizes from Figma leaf boxes */
const EDGE_FEATURES: EdgeFeature[] = [
  {
    iconSrc: '/image/winning-edge/qb.svg',
    iconW: 18.65,
    iconH: 14.85,
    titleLines: ['10 Years Question', 'Bank'],
    description:
      'Access previous year questions with detailed, step-by-step solutions verified by experts.',
    decorSrc: DECOR_A,
  },
  {
    iconSrc: '/image/winning-edge/ai.svg',
    iconW: 17.89,
    iconH: 19,
    titleLines: ['AI Exam', 'Prediction'],
    description:
      'Proprietary smart algorithm analyzes trends to predict high-probability exam questions.',
    decorSrc: DECOR_A,
  },
  {
    iconSrc: '/image/winning-edge/target.svg',
    iconW: 17,
    iconH: 19,
    titleLines: ['Most Repeated', 'Questions'],
    description:
      'Instantly find questions that appear frequently in exams to maximize your scoring potential.',
    decorSrc: DECOR_A,
  },
  {
    iconSrc: '/image/winning-edge/mock.svg',
    iconW: 18.5,
    iconH: 18.5,
    titleLines: ['Mock Tests'],
    description:
      'Practice with real exam pattern tests timed to build stamina and precision for the big day.',
    decorSrc: DECOR_A,
  },
  {
    iconSrc: '/image/winning-edge/chapter.svg',
    iconW: 20.99,
    iconH: 17.55,
    titleLines: ['Chapter & Topic', 'Insights'],
    description:
      'Visualize weightage for every topic. See which chapters require your immediate focus.',
    decorSrc: DECOR_B,
  },
  {
    iconSrc: '/image/winning-edge/performance.svg',
    iconW: 21.5,
    iconH: 16.14,
    titleLines: ['Performance', 'Tracking'],
    description:
      'Data-driven analytics to track weak and strong subjects with personalized improvement maps.',
    decorSrc: DECOR_B,
  },
  {
    iconSrc: '/image/winning-edge/syllabus.svg',
    iconW: 21,
    iconH: 14.9,
    titleLines: ['Full Syllabus', 'Coverage'],
    description:
      'Complete Bihar Board & CBSE syllabus with deep-dive explanations and curated study notes.',
    decorSrc: DECOR_A,
  },
  {
    iconSrc: '/image/winning-edge/career.svg',
    iconW: 18.42,
    iconH: 18.42,
    titleLines: ['Career Assistant'],
    description:
      'Expert guidance for college selection and career planning beyond your board examinations.',
    decorSrc: DECOR_A,
  },
];

const titleFont =
  "'Libre Caslon Text', 'Playfair Display', Georgia, serif";
const bodyFont = "'Manrope', 'Inter', system-ui, sans-serif";
const labelFont = "'DM Sans', system-ui, sans-serif";

/** Top-right decorative wave — Figma Vector rotate-180 (175:834) */
function CardDecor({ src }: { src: string }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[128px] left-[30%] right-0 h-[185px] overflow-hidden"
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

export function WinningEdgeSection() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden bg-white px-4 pb-10 pt-2 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14"
      aria-labelledby="winning-edge-heading"
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1440px]">
        <p
          className="text-center text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px]"
          style={{ fontFamily: labelFont, color: F.label }}
        >
          THE WINNING EDGE
        </p>
        <h2
          id="winning-edge-heading"
          className="mx-auto mt-2 max-w-[900px] text-center text-[28px] font-medium leading-tight tracking-[-0.48px] sm:mt-3 sm:text-[42px] sm:leading-[56px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: F.slate,
          }}
        >
          Powerful Features for Smart Preparation
        </h2>
        <p
          className="mx-auto mt-3 max-w-[627px] text-center text-[15px] leading-7 sm:mt-4 sm:text-[18px]"
          style={{ fontFamily: bodyFont, color: F.stepLabel }}
        >
          Everything you need to excel in CBSE and Bihar Board exams. Engineered
          for scholars who demand excellence.
        </p>

        {/* Steps rail */}
        <div className="relative mx-auto mt-10 max-w-[1138px] sm:mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px md:block"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(195,198,209,0) 0%, rgb(195,198,209) 15%, rgb(195,198,209) 85%, rgba(195,198,209,0) 100%)',
            }}
          />
          <div className="grid grid-cols-4 gap-y-6 lg:grid-cols-8">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="relative z-[1] flex size-10 items-center justify-center rounded-full border bg-white"
                  style={{ borderColor: F.stepBorder }}
                >
                  <span
                    className="text-[12px] font-semibold tracking-[0.48px]"
                    style={{ fontFamily: bodyFont, color: F.stepNum }}
                  >
                    {step.n}
                  </span>
                </div>
                <span
                  className="mt-2 text-[12px] font-semibold tracking-[0.48px]"
                  style={{ fontFamily: bodyFont, color: F.stepLabel }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 8 feature cards — Figma glass + corner wave */}
        <div className="mx-auto mt-10 grid max-w-[1138px] grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {EDGE_FEATURES.map((f) => (
            <article
              key={f.titleLines.join(' ')}
              className="relative flex h-auto min-h-[314px] flex-col overflow-hidden rounded-xl border p-8 sm:h-[314px]"
              style={{
                background: F.cardBg,
                borderColor: F.cardBorder,
              }}
            >
              <CardDecor src={f.decorSrc} />

              <div
                className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-lg"
                style={{ background: F.iconTeal }}
              >
                <img
                  src={f.iconSrc}
                  alt=""
                  aria-hidden
                  width={f.iconW}
                  height={f.iconH}
                  style={{ width: f.iconW, height: f.iconH }}
                />
              </div>

              <h3
                className="relative z-[1] mt-4 text-[24px] font-normal leading-8"
                style={{ fontFamily: titleFont, color: F.title }}
              >
                {f.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p
                className="relative z-[1] mt-4 text-[16px] font-normal leading-6"
                style={{ fontFamily: bodyFont, color: F.body }}
              >
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

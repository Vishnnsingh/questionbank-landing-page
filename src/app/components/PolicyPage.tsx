import { useEffect, useState, type ReactNode } from 'react';
import { CheckCircle2, Clock3, Mail, MapPin, Phone, Sparkles, UserRound } from 'lucide-react';
import {
  fetchAppSupportPrivacy,
  fetchAppSupportTerms,
} from '../api/app-support-api';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import { SUPPORT_EMAIL, SUPPORT_PHONE, pageMeta, products } from '../seo';

/** Home brand CTA tokens (Hero “Register Now”) */
const F = {
  cta: '#0F8F84',
  heading: '#1B2A4A',
  body: '#444444',
  label: '#4B5A78',
  heroGray: '#F0F0F0',
  gradient:
    'linear-gradient(97.77deg, rgba(20, 184, 166, 0.5) 0%, rgba(208, 247, 234, 0.5) 97.73%)',
  white: '#FFFFFF',
  cardBorder: 'rgba(15, 143, 132, 0.22)',
} as const;

const fontCta = "'Inter', system-ui, sans-serif";
const fontBody = "'DM Sans', system-ui, sans-serif";
const fontDisplay = "'Playfair Display', Georgia, serif";

type PolicyPageKey = 'contact' | 'terms' | 'refunds' | 'privacy';

type PolicySection = { title: string; body: string[] };

const pageContent: Record<
  PolicyPageKey,
  { eyebrow: string; title: string; sections: PolicySection[] }
> = {
  contact: {
    eyebrow: 'Support',
    title: 'Contact Us',
    sections: [
      {
        title: 'Customer Support',
        body: [
          'For app access, payments, account issues, study material, mock tests, or refund questions, contact the Prepmagic support team.',
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
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    sections: [
      {
        title: 'Use of Service',
        body: [
          'Prepmagic provides digital exam preparation products for CBSE and Bihar Board students, including question banks, mock tests, analytics, and study guidance.',
          'Users must provide accurate account and payment information and must not misuse, copy, resell, scrape, or redistribute app content without written permission.',
        ],
      },
      {
        title: 'Products and Pricing',
        body: products.map(
          (product) =>
            `${product.name}: INR ${product.price} for ${product.duration}. ${product.description}`,
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

/** Primary home CTA — same as Hero “Register Now” (#0F8F84 · r10) */
function HomeCtaLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
}) {
  const primary = variant === 'primary';
  return (
    <a
      href={href}
      className="inline-flex h-11 min-w-[120px] items-center justify-center px-5 text-[14px] font-bold transition hover:opacity-95 sm:h-12 sm:text-[15px]"
      style={{
        background: primary ? F.cta : F.white,
        color: primary ? F.white : F.cta,
        border: primary ? 'none' : `1.5px solid ${F.cta}`,
        borderRadius: 10,
        fontFamily: fontCta,
      }}
    >
      {children}
    </a>
  );
}

function ContactPageLayout({
  content,
}: {
  content: (typeof pageContent)['contact'];
}) {
  const supportSection = content.sections[0];
  const hoursSection = content.sections[1];

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'rgba(15, 143, 132, 0.12)' }}
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'rgba(208, 247, 234, 0.55)' }}
      />

      {/* Hero — home mint / CTA language */}
      <section
        className="relative mb-10 overflow-hidden rounded-[18px] border bg-white shadow-[0_20px_50px_rgba(226,217,220,0.3)]"
        style={{ borderColor: F.cardBorder }}
      >
        <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: F.cta }} />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: F.gradient }}
          aria-hidden
        />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-[20px] border bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide"
              style={{
                borderColor: '#C7D0E6',
                color: F.label,
                fontFamily: fontBody,
              }}
            >
              <Sparkles className="size-4" style={{ color: F.cta }} />
              {content.eyebrow}
            </div>
            <h1
              className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ fontFamily: fontDisplay, color: F.heading }}
            >
              {content.title}
            </h1>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ fontFamily: fontBody, color: F.body }}
            >
              {pageMeta.contact.description}
            </p>
            <p
              className="mt-5 text-sm"
              style={{ fontFamily: fontBody, color: F.label }}
            >
              Last updated: June 7, 2026
            </p>
          </div>

          <div
            className="flex flex-col justify-center rounded-[12px] border bg-white p-5 sm:p-6"
            style={{ borderColor: F.cardBorder }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: fontCta, color: F.cta }}
            >
              Get in touch
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <HomeCtaLink href={`mailto:${SUPPORT_EMAIL}`} variant="primary">
                Email us
              </HomeCtaLink>
              <HomeCtaLink
                href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
                variant="outline"
              >
                Call now
              </HomeCtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="group relative overflow-hidden rounded-[12px] border bg-white p-5 transition-all hover:-translate-y-0.5"
          style={{
            borderColor: F.cardBorder,
            boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
          }}
        >
          <div
            className="mb-4 inline-flex size-11 items-center justify-center rounded-[10px] text-white"
            style={{ background: F.cta }}
          >
            <Mail className="size-5" />
          </div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: fontCta, color: F.label }}
          >
            Email
          </p>
          <p
            className="mt-1 break-all text-sm font-semibold sm:text-base"
            style={{ fontFamily: fontBody, color: F.heading }}
          >
            {SUPPORT_EMAIL}
          </p>
        </a>

        <a
          href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
          className="group relative overflow-hidden rounded-[12px] border bg-white p-5 transition-all hover:-translate-y-0.5"
          style={{
            borderColor: F.cardBorder,
            boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
          }}
        >
          <div
            className="mb-4 inline-flex size-11 items-center justify-center rounded-[10px] text-white"
            style={{ background: F.cta }}
          >
            <Phone className="size-5" />
          </div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: fontCta, color: F.label }}
          >
            Phone
          </p>
          <p
            className="mt-1 text-sm font-semibold sm:text-base"
            style={{ fontFamily: fontBody, color: F.heading }}
          >
            {SUPPORT_PHONE}
          </p>
        </a>

        <div
          className="relative overflow-hidden rounded-[12px] border bg-white p-5"
          style={{
            borderColor: F.cardBorder,
            boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
          }}
        >
          <div
            className="mb-4 inline-flex size-11 items-center justify-center rounded-[10px] text-white"
            style={{ background: F.cta }}
          >
            <MapPin className="size-5" />
          </div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: fontCta, color: F.label }}
          >
            Location
          </p>
          <p
            className="mt-1 text-sm font-semibold sm:text-base"
            style={{ fontFamily: fontBody, color: F.heading }}
          >
            Patna, Bihar, India
          </p>
        </div>
      </div>

      {/* Founder — professional identity band */}
      <section
        className="relative mb-10 overflow-hidden rounded-[12px] border bg-white"
        style={{
          borderColor: F.cardBorder,
          boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
        }}
        aria-labelledby="founder-heading"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: F.gradient }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-7 lg:p-8">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 bg-white text-lg font-bold tracking-wide sm:size-[4.5rem] sm:text-xl"
            style={{
              borderColor: F.cta,
              color: F.cta,
              fontFamily: fontDisplay,
              boxShadow: '0 8px 24px rgba(15, 143, 132, 0.18)',
            }}
            aria-hidden
          >
            VS
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  borderColor: F.cardBorder,
                  color: F.cta,
                  fontFamily: fontCta,
                }}
              >
                <UserRound className="size-3.5" aria-hidden />
                Founder &amp; CEO
              </span>
            </div>
            <h2
              id="founder-heading"
              className="mt-2.5 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ fontFamily: fontDisplay, color: F.heading }}
            >
              Vishnu Singh
            </h2>
            <p
              className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-[15px]"
              style={{ fontFamily: fontBody, color: F.body }}
            >
              Founder of PrepMagic — building exam preparation for CBSE and Bihar Board
              students, with focus on clear question banks, mocks, and reliable student support
              from Patna, Bihar.
            </p>
          </div>
        </div>
      </section>

      {/* Detail cards — same content */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section
          className="relative overflow-hidden rounded-[12px] border bg-white p-6 sm:p-7"
          style={{
            borderColor: F.cardBorder,
            boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
          }}
        >
          <div className="absolute inset-y-0 left-0 w-1" style={{ background: F.cta }} />
          <div className="flex items-start gap-3 pl-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-[10px] text-white"
              style={{ background: F.cta }}
            >
              <CheckCircle2 className="size-5" />
            </div>
            <div className="min-w-0">
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: fontDisplay, color: F.heading }}
              >
                {supportSection.title}
              </h2>
              <p
                className="mt-3 leading-relaxed"
                style={{ fontFamily: fontBody, color: F.body }}
              >
                {supportSection.body[0]}
              </p>
              <ul
                className="mt-5 space-y-2.5 rounded-[10px] p-4 text-sm"
                style={{ background: F.heroGray, color: F.body, fontFamily: fontBody }}
              >
                {supportSection.body.slice(1).map((line) => (
                  <li key={line} className="flex gap-2">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ background: F.cta }}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden rounded-[12px] border bg-white p-6 sm:p-7"
          style={{
            borderColor: F.cardBorder,
            boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
          }}
        >
          <div className="absolute inset-y-0 left-0 w-1" style={{ background: F.cta }} />
          <div className="flex items-start gap-3 pl-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-[10px] text-white"
              style={{ background: F.cta }}
            >
              <Clock3 className="size-5" />
            </div>
            <div className="min-w-0">
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: fontDisplay, color: F.heading }}
              >
                {hoursSection.title}
              </h2>
              <p
                className="mt-3 leading-relaxed"
                style={{ fontFamily: fontBody, color: F.body }}
              >
                {hoursSection.body[0]}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function parseApiPolicyBody(value: string): PolicySection[] {
  const prepared = String(value || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s+(?=\d{1,2}[.)]\s+[A-Z])/g, '\n')
    .trim();

  if (!prepared) return [];

  const sections: {
    number: string | null;
    heading: string | null;
    paragraphs: string[];
  }[] = [];
  const looseParagraphs: string[] = [];

  prepared
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const numbered = line.match(/^(\d{1,2})[.)]\s*(.+)$/);
      if (numbered) {
        // Keep "7. Intellectual Property" as one heading (not number + body on next line)
        sections.push({
          number: numbered[1],
          heading: numbered[2].trim(),
          paragraphs: [],
        });
        return;
      }
      if (sections.length > 0) {
        sections[sections.length - 1].paragraphs.push(line);
      } else {
        looseParagraphs.push(line);
      }
    });

  if (looseParagraphs.length > 0) {
    sections.unshift({ number: null, heading: null, paragraphs: looseParagraphs });
  }

  return sections.map((section, index) => ({
    title: section.number
      ? section.heading
        ? `${section.number}. ${section.heading}`
        : `${section.number}.`
      : section.heading || `Section ${index + 1}`,
    body: section.paragraphs,
  }));
}

function ApiLegalPage({ page }: { page: 'terms' | 'privacy' }) {
  const fallback = pageContent[page];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState(fallback.title);
  const [sections, setSections] = useState<PolicySection[]>(fallback.sections);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    const loader = page === 'terms' ? fetchAppSupportTerms : fetchAppSupportPrivacy;
    loader()
      .then((payload) => {
        if (cancelled) return;
        const body = String(payload?.body || '').trim();
        const nextTitle = String(payload?.title || '').trim() || fallback.title;
        const parsed = parseApiPolicyBody(body);
        setTitle(nextTitle);
        setSections(parsed.length ? parsed : fallback.sections);
        if (!body && payload?.is_published === false) {
          setError('This policy is not published yet.');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load policy.');
        setTitle(fallback.title);
        setSections(fallback.sections);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, fallback.title, fallback.sections]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: F.cta, fontFamily: fontCta }}
        >
          {fallback.eyebrow}
        </p>
        <h1
          className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ fontFamily: fontDisplay, color: F.heading }}
        >
          {title}
        </h1>
        {loading ? (
          <p className="mt-3 text-sm" style={{ color: F.label, fontFamily: fontBody }}>
            Loading from server…
          </p>
        ) : error ? (
          <p className="mt-3 text-sm text-amber-700">{error}</p>
        ) : null}
      </header>

      {loading ? (
        <p style={{ color: F.label, fontFamily: fontBody }}>Fetching latest policy…</p>
      ) : (
        <div className="space-y-8">
          {sections
            .filter((section) => {
              const titleNorm = title.trim().toLowerCase();
              const sectionTitle = String(section.title || '').trim().toLowerCase();
              if (sectionTitle === titleNorm) return false;
              const onlyDupBody =
                section.body.length === 1 &&
                section.body[0].trim().toLowerCase() === titleNorm;
              return !onlyDupBody;
            })
            .map((section, index) => (
              <section key={`${section.title}-${index}`}>
                <h2
                  className="text-lg font-semibold sm:text-xl"
                  style={{ fontFamily: fontDisplay, color: F.heading }}
                >
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body
                    .filter(
                      (paragraph) =>
                        paragraph.trim().toLowerCase() !== title.trim().toLowerCase(),
                    )
                    .map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-relaxed whitespace-pre-wrap sm:text-base"
                        style={{ fontFamily: fontBody, color: F.body }}
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </main>
  );
}

export function PolicyPage({ page }: { page: PolicyPageKey }) {
  const content = pageContent[page];

  if (page === 'contact') {
    return (
      <div className="min-h-screen" style={{ background: F.heroGray }}>
        <SEO page={page} />
        <SideNav />
        <ContactPageLayout content={content} />
        <Footer />
      </div>
    );
  }

  if (page === 'terms' || page === 'privacy') {
    return (
      <div className="min-h-screen" style={{ background: F.heroGray }}>
        <SEO page={page} />
        <SideNav />
        <ApiLegalPage page={page} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: F.heroGray }}>
      <SEO page={page} />
      <SideNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        <div
          className="relative mb-10 overflow-hidden rounded-[18px] border bg-white p-6 shadow-[0_20px_50px_rgba(226,217,220,0.3)] sm:p-8 lg:p-10"
          style={{ borderColor: F.cardBorder }}
        >
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: F.cta }} />
          <div className="relative">
            <div
              className="inline-flex items-center gap-2 rounded-[20px] border bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide"
              style={{ borderColor: '#C7D0E6', color: F.label, fontFamily: fontBody }}
            >
              <Sparkles className="size-4" style={{ color: F.cta }} />
              {content.eyebrow}
            </div>
            <h1
              className="mt-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ fontFamily: fontDisplay, color: F.heading }}
            >
              {content.title}
            </h1>
            <p
              className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg"
              style={{ fontFamily: fontBody, color: F.body }}
            >
              {pageMeta[page].description}
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="group relative overflow-hidden rounded-[12px] border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-6"
              style={{
                borderColor: F.cardBorder,
                boxShadow: '0px 12px 30px rgba(226, 217, 220, 0.35)',
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: F.cta }} />
              <div className="mb-4 flex items-start gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-[10px] text-white"
                  style={{ background: F.cta }}
                >
                  <CheckCircle2 className="size-5" />
                </div>
                <h2
                  className="text-xl leading-tight font-bold"
                  style={{ fontFamily: fontDisplay, color: F.heading }}
                >
                  {section.title}
                </h2>
              </div>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="leading-relaxed"
                    style={{ fontFamily: fontBody, color: F.body }}
                  >
                    {paragraph}
                  </p>
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

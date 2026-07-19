import { CheckCircle2, Clock3, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import { SUPPORT_EMAIL, SUPPORT_PHONE, pageMeta, products } from '../seo';

type PolicyPageKey = 'contact' | 'terms' | 'refunds' | 'privacy';

const pageContent: Record<PolicyPageKey, { eyebrow: string; title: string; sections: { title: string; body: string[] }[] }> = {
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

function ContactPageLayout({
  content,
}: {
  content: (typeof pageContent)['contact'];
}) {
  const supportSection = content.sections[0];
  const hoursSection = content.sections[1];

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Hero */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400" />
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-teal-200/30 blur-2xl" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-100">
              <Sparkles className="size-4" />
              {content.eyebrow}
            </div>
            <h1 className="mt-5 text-3xl tracking-tight text-slate-950 sm:text-5xl">{content.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {pageMeta.contact.description}
            </p>
            <p className="mt-5 text-sm text-slate-500">Last updated: June 7, 2026</p>
          </div>

          <div
            className="flex flex-col justify-center rounded-2xl border border-teal-100 bg-gradient-to-br from-slate-50 via-white to-teal-50/60 p-5 sm:p-6"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(13,148,136,0.06)' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">Get in touch</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center rounded-full bg-[#0A121D] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
              >
                Email us
              </a>
              <a
                href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
                className="inline-flex items-center rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-semibold text-teal-800 transition hover:border-teal-400"
              >
                Call now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
        >
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
            <Mail className="size-5" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Email</p>
          <p className="mt-1 break-all text-sm font-semibold text-slate-900 sm:text-base">{SUPPORT_EMAIL}</p>
        </a>

        <a
          href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
        >
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-md">
            <Phone className="size-5" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Phone</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">{SUPPORT_PHONE}</p>
        </a>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-slate-200/50">
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 text-white shadow-md">
            <MapPin className="size-5" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Location</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">Patna, Bihar, India</p>
        </div>
      </div>

      {/* Detail cards — same content */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-7">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-teal-500" />
          <div className="flex items-start gap-3 pl-2">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl tracking-tight text-slate-950">{supportSection.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{supportSection.body[0]}</p>
              <ul className="mt-5 space-y-2.5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                {supportSection.body.slice(1).map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-7">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-600 to-cyan-500" />
          <div className="flex items-start gap-3 pl-2">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white shadow-md">
              <Clock3 className="size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl tracking-tight text-slate-950">{hoursSection.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{hoursSection.body[0]}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export function PolicyPage({ page }: { page: PolicyPageKey }) {
  const content = pageContent[page];

  if (page === 'contact') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
        <SEO page={page} />
        <SideNav />
        <ContactPageLayout content={content} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <SEO page={page} />
      <SideNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
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

        <div className="grid gap-5 lg:grid-cols-2">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl sm:p-6"
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
                  <p key={paragraph} className="leading-relaxed text-slate-600">
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

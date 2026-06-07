import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import { SUPPORT_EMAIL, SUPPORT_PHONE, pageMeta, products } from '../seo';

type PolicyPageKey = 'about' | 'contact' | 'support' | 'terms' | 'refunds' | 'privacy';

const pageContent: Record<PolicyPageKey, { eyebrow: string; title: string; sections: { title: string; body: string[] }[] }> = {
  about: {
    eyebrow: 'About',
    title: 'About Us',
    sections: [
      {
        title: 'Built for Bihar Board Students',
        body: [
          'Honhaar is a focused learning app for Class 10 and Class 12 students preparing for CBSE and Bihar Board exams.',
          'The platform combines previous year questions, mock tests, repeated question insights, chapter-wise practice, and performance tracking in one simple mobile experience.',
        ],
      },
      {
        title: 'Our Goal',
        body: [
          'Our goal is to make exam preparation more affordable, organized, and practical for students across Bihar.',
          'Students can choose a class plan, practice consistently, understand important topics, and track their preparation progress before exams.',
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <SEO page={page} />
      <SideNav />
      <div className="pt-16 lg:pl-64 lg:pt-0">
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-teal-700 transition-colors mb-10">
            <ArrowLeft className="size-4" />
            Back to home
          </a>

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{content.eyebrow}</p>
            <h1 className="mt-3 text-3xl sm:text-5xl text-slate-950 tracking-tight">{content.title}</h1>
            <p className="mt-4 text-slate-600">{pageMeta[page].description}</p>
            <p className="mt-2 text-sm text-slate-500">Last updated: June 7, 2026</p>
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

          <div className="space-y-6">
            {content.sections.map((section) => (
              <section key={section.title} className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
                <h2 className="text-xl text-slate-950 mb-3">{section.title}</h2>
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
    </div>
  );
}
